import { h } from "hyperapp";

import { IActions } from "./Actions";
import Dumpstate from "./Dumpstate";
import Fetching from "./Fetching";
import Notification from "./Notification";
import Results from "./Results";
import { IState } from "./State";
import { getDbUrl } from "./utils";
import Sidebar from "./Sidebar";
import Searchbox from "./Searchbox";
import Pagination from "./Pagination";

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
                <Searchbox flag={"Search"}/>
                {state.notification &&
                <div className="notification is-warning">
                    {state.notification}
                </div>
                }
            </div>
        </div>
        <div className="columns">
            <div className="column">
                <Dumpstate actions={actions}/>
                <Fetching isFetching={state.isFetching} actions={actions}/>
                <Sidebar flag={"World"}/>
            </div>
            <div className="column is-four-fifths">
                <Results values={state.resources}/>
                <Pagination flag={"Pagination"}/>
            </div>
        </div>
    </div>
);
