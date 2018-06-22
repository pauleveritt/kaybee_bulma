import { ActionsType } from "hyperapp";

import { IDbJson } from "./dbjson";
import { IState } from "./State";

export interface IActions {
    setFetching: (isFetching: boolean) => { isFetching: boolean };
    setNotification: (msg: string) => { notification: string };
    getJson: (dbUrl: string) => Promise<void>;
    setResources: (dbResources: any) => { resources: any };
    getState: () => IState;
}

class Actions implements ActionsType<IState, IActions> {
    getState = () => (state: IState) => state;
    setFetching = (isFetching: boolean) => ({isFetching});
    setNotification = (notification: string) => ({notification});
    setResources = (dbResources: any) => ({resources: dbResources});
    getJson = (dbUrl: string) => async (state: IState, actions: IActions) => {
        try {
            const response: Response = await fetch(dbUrl);
            const dbJson: IDbJson = await response.json();
            actions.setResources(dbJson.resources);
        } catch (error) {
            actions.setNotification("Error: " + error.message);
            throw new Error(error.message);
        }
    };
}

export default Actions;
