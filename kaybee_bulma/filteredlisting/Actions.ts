import { ActionsType } from "hyperapp";

import { IDbJson, setFilterGroups, setResources, sortResults } from "./dbjson";
import { IFilterGroup, IFilterGroups, IReference, IResource, IResources, IState } from "./State";

export function filterValues(
    results: IResource[],
    filterGroups: IFilterGroups,
    filterParent: string | undefined) {

    let filteredResults = [ ...results ];

    // Start by filtering results based on parent, if state.filterParent
    // has a docname to filter by
    if (filterParent) {
        filteredResults = filteredResults.filter(
            (result: IResource) => {
                return result.parent_docnames.includes(filterParent);
            }
        );
    }

    const filterGroupValues = Object.values(filterGroups);
    filteredResults = filteredResults.filter(
        (result: IResource) => {
            // Use an AND between filter groups with an OR for choices
            // within a filter group.

            console.log("######### ", result.docname);
            const accumulator = filterGroupValues.map(
                (filterGroup: IFilterGroup) => {
                    // Get the results of all the choices for this FG
                    const answers = Object.values(filterGroup.choices)
                        .map(
                            (choice) => {
                                // For this filter group choice, first see
                                // if is checked. If not, we don't care.
                                if (!choice.checked) {
                                    return true;
                                }

                                if (filterGroup.value === "author") {
                                    return result.author && result.author.docname === choice.value;
                                } else if (filterGroup.value === "rtype") {
                                    return result.rtype === choice.value;
                                } else {
                                    const resultRefs = result.references;
                                    if (resultRefs) {

                                        return resultRefs.map(
                                            (resultRef: IReference) => {
                                                return resultRef.reftype === filterGroup.value &&
                                                    resultRef.docname === choice.value;
                                            }
                                        ).includes(true);
                                    }
                                    return true;
                                }
                            }
                        );
                    return answers.includes(true);
                }
            );
            console.log(2323, accumulator);
            // const x = accumulator.every(fg => !fg.includes(false));
            // console.log(2323999, accumulator);
            // return x;
        }
    );

    // if (filterKeysValues.length) {
    //     filteredResults = filteredResults.filter((result: IResource) => {
    //         let hasMatch = false;
    //
    //         // For this result, iterate through the "true" filterGroup
    //         // values, looking in references, author, etc.
    //         filterKeysValues.map(([ reftype, value ]: [ string, string ]) => {
    //             // Look in author
    //             if (reftype === "author") {
    //                 if (result.author && result.author.docname === value) {
    //                     hasMatch = true;
    //                 } else {
    //                     hasMatch = false;
    //                 }
    //             } else if (reftype === "rtype") {
    //                 if (result.rtype === value) {
    //                     hasMatch = true;
    //                 } else {
    //                     hasMatch = false;
    //                 }
    //             } else {
    //                 // Look in references
    //                 const resultRefs = result.references;
    //                 if (resultRefs) {
    //                     resultRefs.map(
    //                         (resultRef: IReference) => {
    //                             if (resultRef.reftype === reftype &&
    //                                 resultRef.docname === value) {
    //                                 hasMatch = true;
    //                             }
    //                         }
    //                     );
    //                 } else {
    //                     hasMatch = false;
    //                 }
    //             }
    //         });
    //
    //         return hasMatch;
    //     });
    // }
    return filteredResults;
}

export interface IActions {
    setFetching: (isFetching: boolean) => { isFetching: boolean };
    setNotification: (msg: string) => { notification: string };
    setDbUrl: (dbUrl: string) => { dbUrl: string };
    setFilterParent: (docname: string) => { filterParent: string };
    getJson: (dbUrl: string) => Promise<void>;
    setDb: (dbJson: IDbJson) => { resources: IResources, filterGroups: IFilterGroup[] };
    getState: () => IState;
    setFilterTerm: (filterTerm: string) => { filterTerm: string };
    setFilterChoice: () => { filterGroups: IFilterGroup[] };
    filterResults: () => { results: IResource[] }
}

class Actions implements ActionsType<IState, IActions> {
    setDbUrl = (dbUrl: string) => ({dbUrl});
    setFilterParent = (docname: string) => ({filterParent: docname});
    getState = () => (state: IState) => state;
    setFetching = (isFetching: boolean) => ({isFetching});
    setNotification = (notification: string) => ({notification});

    filterResults = () => (state: IState, actions: IActions) => {
        let results = Object.values(state.resources);

        // If a filterterm, filter by that
        if (state.filterTerm) {
            results = results.filter(({title, excerpt}) => {
                const tgt = title + " " + excerpt;
                return tgt.toLowerCase().includes(state.filterTerm.toLowerCase());
            });
        }

        // Now filter based on checkboxes. Start by collecting all set
        // keys/values to filter on
        // const filterKeysValues: Array<[ string, string ]> = getFilterGroupValues(state.filterGroups);

        // Filter results by matching any of the keysValues
        results = filterValues(results, state.filterGroups, state.filterParent);

        // Sort results by some criteria
        results = sortResults(results, state.resultInfo);

        return {results};
    };

    setDb = (dbJson: IDbJson) => (state: IState, actions: IActions) => {
        // Validate/Clean up the data in any ways

        if (!(dbJson.resources) && (dbJson.references)) {
            actions.setNotification("Server data missing resources or references");
            return;
        }

        const resources: IResources = setResources(
            dbJson.resources,
            dbJson.references,
            state.dbUrl as string
        );
        const filterGroups: IFilterGroups = setFilterGroups(
            dbJson.references, resources, state.filterParent);
        actions.filterResults();
        return {
            resources,
            filterGroups
        };
    };

    getJson = (dbUrl: string) => async (state: IState, actions: IActions) => {

        // Before fetching
        actions.setDbUrl(dbUrl);
        actions.setFetching(true);
        actions.setNotification("");

        try {
            const response: Response = await fetch(dbUrl);
            if (response.status !== 200) {
                // noinspection ExceptionCaughtLocallyJS
                throw Error(response.statusText);
            }
            const dbJson: IDbJson = await response.json();
            actions.setDb(dbJson);
            actions.filterResults();
        } catch (error) {
            actions.setNotification("Error: " + error.message);
            throw new Error(error.message);
        }
        actions.setFetching(false);
    };
    setFilterTerm = (filterTerm: string) => ({filterTerm});
    setFilterChoice = () => (state: IState) => {
        const newFilterGroups = {...state.filterGroups};
        return {filterGroups: newFilterGroups};
    };
}

export default Actions;
