import { h } from "hyperapp";

import { IActions } from "./Actions";
import { IState } from "./State";

const Searchbox = () => (state: IState, actions: IActions) => (
    <div class="field">
        <p class="control is-expanded has-icons-left">
            <input
                class="input"
                type="text"
                placeholder="Filter listing..."
                autoFocus
                onkeyup={
                    ({target: v}: any) => {
                        actions.setFilterterm(v.value);
                    }}
            />
            <span class="icon is-small is-left">
              <i class="fas fa-search"/>
            </span>
        </p>
    </div>
);

export default Searchbox;
