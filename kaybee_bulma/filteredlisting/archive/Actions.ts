import { ActionsType } from "hyperapp";
import { IDbJson, IFilterChoice, IFilterGroup, IReferences, IResource, IResources, IResult, IState } from "./State";

export interface IActions {
    toggleFetching: (isFetching: boolean) => Partial<IState>;
    setNotification: (msg: string) => Partial<IState>;
    getJson: (dbUrl: string) => Partial<IState>;
    setJson: (data: IDbJson) => Partial<IState>;
    setFilterterm: (filterterm: string) => Partial<IState>;
}

export function getFilterGroupValues(filterGroups: IFilterGroup[]): Array<[ string, string ]> {
    const keysValues: Array<[ string, string ]> = [];
    if (filterGroups) {
        filterGroups.map((fg: IFilterGroup) => {
            fg.choices.map((fc: IFilterChoice) => {
                if (fc.checked) {
                    keysValues.push([ fg.value, fc.value ]);
                }
            });
        });
    }
    return keysValues;
}

export function filterValues(
    resources: IResource[],
    filterKeysValues: Array<[ string, string ]>) {

    let filteredResources = [ ...resources ];
    if (filterKeysValues.length) {
        filteredResources = resources.filter((result: any) => {
            let hasMatch = false;
            filterKeysValues.map(([ key, value ]: [ string, string ]) => {
                if (result[ key ] && result[ key ] === value) {
                    hasMatch = true;
                }
            });
            return hasMatch;
        });
    }
    return filteredResources;
}

export function flattenResults(
    filteredResources: IResource[],
    allResources: IResources,
    allReferences: IReferences
) {
    /*
        Dereference the primary author and each reference for all results

     */

    return filteredResources.map(resource => {
        const references = resource.props.references;

        // Flatten the author
        let author: IResource | undefined;
        if (references) {
            if (references.author) {
                const primaryAuthorLabel = resource.props.references.author[ 0 ];
                if (primaryAuthorLabel) {
                    const authorDocname = allReferences.author[ primaryAuthorLabel ].docname;
                    author = allResources[ authorDocname ];
                }
            }
        }

        // Flatten the non-author references
        const theseReferences: IResource[] = [];
        if (references) {
            Object.entries(references).map(reference => {
                const reftype = reference[ 0 ];
                const docnames = reference[ 1 ] as string[];
                if (reftype !== "author)") {
                    docnames.map((label: string) => {
                        const docname = allReferences[ reftype ][ label ].docname;
                        const thisResource = allResources[ docname ];
                        theseReferences.push(thisResource);
                    });
                }
            });
        }
        return {resource, author, references: theseReferences};
    });

}

export function generateResults(
    initialDbJson: IDbJson,
    filterterm: string,
    filterGroups: IFilterGroup[]
): IResult[] {

    let resources = Object.values(initialDbJson.resources);

    // If a filterterm, filter by that
    if (filterterm) {
        resources = resources.filter(({title, excerpt}) => {
            const tgt = title + " " + excerpt;
            return tgt.toLowerCase().includes(filterterm.toLowerCase());
        });
    }

    // Now filter based on checkboxes. Start by collecting all set
    // keys/values to filter on
    const filterKeysValues: Array<[ string, string ]> = getFilterGroupValues(filterGroups);

    // Filter results by matching any of the keysValues
    resources = filterValues(resources, filterKeysValues);

    // Now that we've filtered, let's assemble each author/references
    return flattenResults(resources, initialDbJson.resources, initialDbJson.references);
}

class Actions implements ActionsType<IState, IActions> {
    toggleFetching = (isFetching: boolean) => ({isFetching});
    setNotification = (message: string) => ({notification: message});
    getJson = (dbUrl: string) =>
        async (state: IState, actions: IActions) => {
            state.dbUrl = dbUrl;

            // Before fetching
            actions.toggleFetching(true);
            actions.setNotification("");

            // Fetch
            await fetch(state.dbUrl)
                .then(response => {
                    if (response.status !== 200) {
                        throw Error(response.statusText);
                    } else {
                        response.json()
                            .then((jsonData: IDbJson) => {
                                if (!(jsonData.resources) && (jsonData.references)) {
                                    state.notification = "Server data missing resources or references";
                                } else {
                                    state.initialDbJson = jsonData;
                                    state.results = generateResults(
                                        jsonData, "", []
                                    );
                                }
                            });
                    }
                })
                .catch((error) => {
                    // Catches no-response errors as well as the server errors
                    // in the !response.ok test above
                    state.notification = error.message;
                });

            state.isFetching = false;
            return {...state};
        };

    setJson = (data: IDbJson) => () => {
        return {initialDbJson: data, results: Object.values(data.resources)};
    };

    setFilterterm = (filterterm: string) =>
        (state: IState, actions: IActions) => {
            const ft = filterterm.toLowerCase();
            const results = generateResults(
                state.initialDbJson, ft, []
            );
            return {filterterm: ft, results};
        };
}

export default Actions;
