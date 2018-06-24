import { ActionsType } from "hyperapp";

import { IDbJson, setFilterGroups, setResources } from "./dbjson";
import { IFilterGroup, IResources, IState } from "./State";

export interface IActions {
    setFetching: (isFetching: boolean) => { isFetching: boolean };
    setNotification: (msg: string) => { notification: string };
    getJson: (dbUrl: string) => Promise<void>;
    setDb: (dbJson: IDbJson) => { resources: IResources, filterGroups: IFilterGroup[] };
    getState: () => IState;
    setFilterterm: (filterTerm: string) => { filterTerm: string };
    setFilterChoice: () => { filterGroups: IFilterGroup[] };
}

class Actions implements ActionsType<IState, IActions> {
    getState = () => (state: IState) => state;
    setFetching = (isFetching: boolean) => ({isFetching});
    setNotification = (notification: string) => ({notification});

    setDb = (dbJson: IDbJson) => (state: IState, actions: IActions) => {
        // Validate/Clean up the data in any ways

        if (!(dbJson.resources) && (dbJson.references)) {
            actions.setNotification("Server data missing resources or references");
            return;
        }
        return {
            resources: setResources(dbJson.resources, dbJson.references),
            filterGroups: setFilterGroups(dbJson.references, dbJson.resources)
        };
    };

    getJson = (dbUrl: string) => async (state: IState, actions: IActions) => {

        // Before fetching
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
        } catch (error) {
            actions.setNotification("Error: " + error.message);
            throw new Error(error.message);
        }
        actions.setFetching(false);
    };
    setFilterterm = (filterTerm: string) => ({filterTerm});
    setFilterChoice = () => (state: IState) => {
        const newFilterGroups = [ ...state.filterGroups ];
        return {filterGroups: newFilterGroups};
    };
}

export default Actions;
