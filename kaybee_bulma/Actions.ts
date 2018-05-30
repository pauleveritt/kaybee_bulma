import { ActionsType } from "hyperapp";
import { IFilterChoice, IFilterGroup, IResult, IState } from "./State";

const DB_URL = `http://localhost:3000/db`;

export interface IDbJson {
    results: IResult[];
    filterGroups: IFilterGroup[];
}

export interface IActions {
    getInitialJson: () => void;
    setInitialJson: (initialJson: IDbJson) => void;
    toggleFetching: (isFetching: boolean) => void;
    consoleLog: (data: any) => void;
    setFilterterm: (filterterm: string) => void;
    setFilterChoice: () => void;
    filterResults: (filterterm: string) => void;
}

const Actions: ActionsType<IState, IActions> = {
    getInitialJson: () => async (state: IState, actions: any) => {
        actions.toggleFetching(true);
        actions.setInitialJson(
            await fetch(DB_URL)
                .then(data => data.json())
        );
        actions.toggleFetching(false);
    },
    setInitialJson: ({results, filterGroups}: IDbJson) => ({
        initialJson: results,
        results,
        filterGroups
    }),
    toggleFetching: (isFetching: boolean) => ({isFetching}),
    setFilterterm: (filterterm: string) =>
        (state: IState, actions: IActions) => {
            const ft = filterterm.toLowerCase();
            return actions.filterResults(ft);
        },
    setFilterChoice: () => (state: IState, actions: IActions) => {
        return actions.filterResults(state.filterterm);
    },
    filterResults: (filterterm: string) =>
        (state: IState) => {
            // Make a copy of the original data
            let results = state.initialJson.filter(() => true);

            // If a filterterm, filter by that
            if (filterterm) {
                results = results.filter(({title, excerpt}) => {
                    const tgt = title + " " + excerpt;
                    return tgt.toLowerCase().includes(filterterm);
                });
            }

            // Now filter based on checkboxes. Start by collecting all set
            // keys/values to filter on
            // noinspection JSMismatchedCollectionQueryUpdate
            const keysValues: Array<[string, string]> = [];
            state.filterGroups.map((fg: IFilterGroup) => {
                fg.choices.map((fc: IFilterChoice) => {
                    if (fc.checked) {
                        keysValues.push([fg.value, fc.value]);
                    }
                });
            });

            // Filter results by matching any of the keysValues
            if (keysValues.length) {
                results = results.filter((result: any) => {
                    let hasMatch = false;
                    keysValues.map(([key, value]: [string, string]) => {
                        if (result[key] && result[key] === value) {
                            hasMatch = true;
                        }
                    });
                    return hasMatch;
                });
            }

            // Return the results
            return {results, filterterm};
        },
    consoleLog: (data: any) => console.log("Data:", data)
};

export default Actions;
