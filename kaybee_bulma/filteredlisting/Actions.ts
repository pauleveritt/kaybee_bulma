import { ActionsType } from "hyperapp";

import { IDbJson, setFilterGroups, setResources } from "./dbjson";
import { IFilterChoice, IFilterGroup, IReference, IResource, IResources, IState } from "./State";

export function getFilterGroupValues(filterGroups: IFilterGroup[]): Array<[ string, string ]> {
    const keysValues: Array<[ string, string ]> = [];
    if (filterGroups) {
        filterGroups.map((fg: IFilterGroup) => {
            Object.values(fg.choices).map((fc: IFilterChoice) => {
                if (fc.checked) {
                    keysValues.push([ fg.value, fc.value ]);
                }
            });
        });
    }
    return keysValues;
}

export function filterValues(
    results: IResource[],
    filterKeysValues: Array<[ string, string ]>) {

    let filteredResults = [ ...results ];
    if (filterKeysValues.length) {
        filteredResults = results.filter((result: IResource) => {
            let hasMatch = false;

            // For this result, iterate through the "true" filterGroup
            // values, looking in references, author, etc.
            filterKeysValues.map(([ reftype, value ]: [ string, string ]) => {
                // Look in author
                if (reftype === "author") {
                    if (result.author && result.author.docname === value) {
                        hasMatch = true;
                    }
                } else {
                    // Look in references
                    const resultRefs = result.references;
                    if (resultRefs) {
                        resultRefs.map(
                            (resultRef: IReference) => {
                                if (resultRef.reftype === reftype &&
                                    resultRef.docname === value) {
                                    hasMatch = true;
                                }
                            }
                        );
                    }
                }
            });

            return hasMatch;
        });
    }
    return filteredResults;
}

export interface IActions {
    setFetching: (isFetching: boolean) => { isFetching: boolean };
    setNotification: (msg: string) => { notification: string };
    setDbUrl: (dbUrl: string) => { dbUrl: string };
    getJson: (dbUrl: string) => Promise<void>;
    setDb: (dbJson: IDbJson) => { resources: IResources, filterGroups: IFilterGroup[] };
    getState: () => IState;
    setFilterTerm: (filterTerm: string) => { filterTerm: string };
    setFilterChoice: () => { filterGroups: IFilterGroup[] };
    filterResults: () => { results: IResource[] }
}

class Actions implements ActionsType<IState, IActions> {
    setDbUrl = (dbUrl: string) => ({dbUrl});
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
        const filterKeysValues: Array<[ string, string ]> = getFilterGroupValues(state.filterGroups);

        // Filter results by matching any of the keysValues
        results = filterValues(results, filterKeysValues);

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
        const filterGroups: IFilterGroup[] = setFilterGroups(dbJson.references, dbJson.resources);
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
        const newFilterGroups = [ ...state.filterGroups ];
        return {filterGroups: newFilterGroups};
    };
}

export default Actions;
