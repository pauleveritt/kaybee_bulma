import { h } from "hyperapp";
import Pagination from "./Pagination";
import Results from "./Results";
import Searchbox from "./Searchbox";
import Sidebar from "./Sidebar";

import { getDbUrl } from "../utils";
import { IActions } from "./Actions";
import { IState } from "./State";

export default (state: IState, actions: IActions) => (
    <div
        class="kbb-fl"
        oncreate={(element: HTMLElement) => {
            // Get the URL from a data attribute in the HTML
            const dbUrl = getDbUrl(element);
            if (dbUrl) {
                actions.getJson(dbUrl);
            }
        }}
    >
        <div class="columns is-centered">
            <div class="column is-half">
                <Searchbox/>
                {state.notification &&
                <div class="notification is-warning">
                    {state.notification}
                </div>
                }
            </div>
        </div>
        <div class="columns">
            <div class="column">
                <Sidebar/>
            </div>
            <div class="column is-four-fifths">
                <Results values={state.results}/>
                <Pagination/>
            </div>
        </div>
    </div>
);
