import { h } from "hyperapp";
import Pagination from "./Pagination";
import Results from "./Results";
import Searchbox from "./Searchbox";
import Sidebar from "./Sidebar";

import { IState } from "./State";

export default (state: IState) => (
    <div
        class="kbb-fl">
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
                <Results/>
                <Pagination/>
            </div>
        </div>
    </div>
);
