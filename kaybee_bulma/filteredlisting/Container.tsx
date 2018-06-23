import { h } from "hyperapp";

import { IActions } from "./Actions";
import Dumpstate from "./Dumpstate";
import Fetching from "./Fetching";
import Notification from "./Notification";
import Results from "./Results";
import { IState } from "./State";
import { getDbUrl } from "./utils";

const onCreate = (element: HTMLElement, actions: IActions) => {
    const dbUrl = getDbUrl(element);
    if (dbUrl) {
        actions.getJson(dbUrl);
    }
};

export default (state: IState, actions: IActions) => (
    <div oncreate={(element: HTMLElement) => onCreate(element, actions)}>
        <Notification notification={state.notification}/>
        <Dumpstate actions={actions}/>
        <Fetching isFetching={state.isFetching} actions={actions}/>
        <Results values={state.resources}/>
    </div>
);
