import { h } from "hyperapp";

import { IActions } from "./Actions";
import Dumpstate from "./Dumpstate";
import Fetching from "./Fetching";
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
        <div className="columns is-centered">
            <div className="column is-half">
                <Notification notification={state.notification}/>
                <Searchbox actions={actions}/>
                {state.notification &&
                <div className="notification is-warning">
                    {state.notification}
                </div>
                }
            </div>
        </div>
        <div className="columns">
            <div className="column">
                <div>Ft: <code>{state.filterTerm}</code></div>
                <Dumpstate actions={actions}/>
                <Fetching isFetching={state.isFetching} actions={actions}/>
                <Sidebar filterGroups={state.filterGroups} actions={actions}/>
            </div>
            <div className="column is-four-fifths">
                <Results values={state.resources}/>
                <Pagination flag={"Pagination"}/>
            </div>
        </div>
    </div>
);
