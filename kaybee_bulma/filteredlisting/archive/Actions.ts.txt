import { ActionsType } from "hyperapp";
import { IDbJson, IFilterChoice, IFilterGroup, IState } from "./State";

export interface IActions {
    toggleFetching: (isFetching: boolean) => Partial<IState>;
    setNotification: (msg: string) => Partial<IState>;
    getJson: (dbUrl: string) => Partial<IState>;
    setInitialJson: (data: IDbJson) => Partial<IState>;
    // verifyJson: (data: IDbJson) => any;
    // setInitialJson: (initialJson: IDbJson) => void;
    setFilterterm: (filterterm: string) => Partial<IState>;
    // setFilterChoice: () => void;
    filterResults: (filterterm: string) => Partial<IState>;
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
                                    actions.setInitialJson(jsonData);
                                }
                            });
                    }
                })
                .catch((error) => {
                    // Catches no-response errors as well as the server errors
                    // in the !response.ok test above
                    actions.setNotification(error.message);
                });

            state.isFetching = false;
            return {...state};
        }

    setFilterterm = (filterterm: string) =>
        (state: IState, actions: IActions) => {
            const ft = filterterm.toLowerCase();
            return actions.filterResults(ft);
        }

    setInitialJson = (data: IDbJson) => (state: IState) => {
        return {initialDbJson: data, results: Object.values(data.resources)};
    }

    filterResults = (filterterm: string) =>
        (state: IState) => {
            // Make a copy of the original data
            let results = Object.values(state.initialDbJson.resources);

            // If a filterterm, filter by that
            if (filterterm) {
                results = results.filter(({title, excerpt}) => {
                    const tgt = title + " " + excerpt;
                    return tgt.toLowerCase().includes(filterterm);
                });
            }

            // // Now filter based on checkboxes. Start by collecting all set
            // // keys/values to filter on
            // // noinspection JSMismatchedCollectionQueryUpdate
            // const keysValues: Array<[ string, string ]> = [];
            // state.filterGroups.map((fg: IFilterGroup) => {
            //     fg.choices.map((fc: IFilterChoice) => {
            //         if (fc.checked) {
            //             keysValues.push([ fg.value, fc.value ]);
            //         }
            //     });
            // });
            //
            // // Filter results by matching any of the keysValues
            // if (keysValues.length) {
            //     results = results.filter((result: any) => {
            //         let hasMatch = false;
            //         keysValues.map(([ key, value ]: [ string, string ]) => {
            //             if (result[ key ] && result[ key ] === value) {
            //                 hasMatch = true;
            //             }
            //         });
            //         return hasMatch;
            //     });
            // }

            // Return the results
            return {results, filterterm};
        }
,
}

// const xActions: ActionsType<IState, IActions> = {
//     up: (value: number) => (state: IState) => ({count: state.count + value}),
//     verifyJson: (data) => (state: IState, actions: IActions) => {
//         if (!data.resources) {
//             actions.setNotification("Data are missing resources");
//         } else if (!data.references) {
//             actions.setNotification("Data are missing references");
//         } else {
//             actions.setInitialJson(data);
//         }
//     },
//     setInitialJson: ({resources, references}: IDbJson) => ({
//         initialJson: {resources, references},
//         results: resources
//     }),
//     toggleFetching: (isFetching: boolean) => ({isFetching}),
//     setFilterterm: (filterterm: string) =>
//         (state: IState, actions: IActions) => {
//             const ft = filterterm.toLowerCase();
//             return actions.filterResults(ft);
//         },
//     setFilterChoice: () => (state: IState, actions: IActions) => {
//         return actions.filterResults(state.filterterm);
//     },
//     filterResults: (filterterm: string) =>
//         (state: IState) => {
//             // Make a copy of the original data
//             let results = state.initialJson.filter(() => true);
//
//             // If a filterterm, filter by that
//             if (filterterm) {
//                 results = results.filter(({title, excerpt}) => {
//                     const tgt = title + " " + excerpt;
//                     return tgt.toLowerCase().includes(filterterm);
//                 });
//             }
//
//             // Now filter based on checkboxes. Start by collecting all set
//             // keys/values to filter on
//             // noinspection JSMismatchedCollectionQueryUpdate
//             const keysValues: Array<[ string, string ]> = [];
//             state.filterGroups.map((fg: IFilterGroup) => {
//                 fg.choices.map((fc: IFilterChoice) => {
//                     if (fc.checked) {
//                         keysValues.push([ fg.value, fc.value ]);
//                     }
//                 });
//             });
//
//             // Filter results by matching any of the keysValues
//             if (keysValues.length) {
//                 results = results.filter((result: any) => {
//                     let hasMatch = false;
//                     keysValues.map(([ key, value ]: [ string, string ]) => {
//                         if (result[ key ] && result[ key ] === value) {
//                             hasMatch = true;
//                         }
//                     });
//                     return hasMatch;
//                 });
//             }
//
//             // Return the results
//             return {results, filterterm};
//         },
//     setNotification: (message) => ({notification: message})
// };

export default Actions;
