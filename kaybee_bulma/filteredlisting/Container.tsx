import { h } from "hyperapp";

import Pagination from "./Pagination";
import Results from "./Results";
import Searchbox from "./Searchbox";
import Sidebar from "./Sidebar";

export default () => (
    <div class="kbb-filteredlisting">
        <div class="columns is-centered">
            <div class="column is-half">
                <Searchbox/>
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
