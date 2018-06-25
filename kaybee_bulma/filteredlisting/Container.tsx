import { h } from "hyperapp";

import { IActions } from "./Actions";
import Dumpstate from "./Dumpstate";
import Notification from "./Notification";
import Pagination from "./Pagination";
import Results from "./Results";
import Searchbox from "./Searchbox";
import Sidebar from "./Sidebar";
import { IState } from "./State";
import { getDbUrl } from "./utils";

const onCreate = (element: HTMLElement, actions: IActions) => {
    const dbUrl = getDbUrl(element);
    if (dbUrl) {
        actions.getJson(dbUrl);
    }
};

export default (state: IState, actions: IActions) => (
    <div
        class="kbb-fl"
        oncreate={(element: HTMLElement) => onCreate(element, actions)}
    >
        <div class="columns is-centered">
            <div class="column is-half">
                <Notification notification={state.notification}/>
                <Searchbox actions={actions}/>
                {state.notification &&
                <div class="notification is-warning">
                    {state.notification}
                </div>
                }
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <Sidebar filterGroups={state.filterGroups} actions={actions}/>
                <Dumpstate actions={actions}/>
            </div>
            <div class="column is-four-fifths">
                <Results values={state.results}/>
                <Pagination/>
            </div>
        </div>
    </div>
);
