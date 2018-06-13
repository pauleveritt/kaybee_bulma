import { ActionsType } from "hyperapp";
import { IDbJson, IState } from "./State";

export interface IActions {
    toggleFetching: (isFetching: boolean) => Partial<IState>;
    setNotification: (msg: string) => Partial<IState>;
    getJson: (dbUrl: string) => Partial<IState>;
    setJson: (data: IDbJson) => Partial<IState>;
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
                                    state.results = Object.values(jsonData.resources);
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
        }

    setJson = (data: IDbJson) => () => {
        return {initialDbJson: data, results: Object.values(data.resources)};
    }
}

export default Actions;
