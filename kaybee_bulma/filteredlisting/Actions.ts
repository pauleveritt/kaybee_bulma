import { ActionsType } from "hyperapp";

import {
    filterResources,
    IDbJson,
    IReducedFilterGroups,
    reduceFilterGroups,
    setFilterGroups,
    setResources,
    sortResults
} from "./dbjson";
import { IFilterGroup, IFilterGroups, IResource, IResources, IState } from "./State";

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

        const reducedFilterGroups: IReducedFilterGroups = reduceFilterGroups(state.filterGroups);
        const filterTerm = state.filterTerm;
        const filterParent = state.filterParent;
        let results = filterResources(reducedFilterGroups, state.resources, filterTerm, filterParent);

        // Sort results by some criteria
        results = sortResults(results);

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
