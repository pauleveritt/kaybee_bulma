import { h } from "hyperapp";

import { IActions } from "./Actions";
import { IState } from "./State";

const Searchbox = () => (state: IState, actions: IActions) => (
    <div class="field">
        <p className="control is-expanded has-icons-left">
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
            <span className="icon is-small is-left">
              <i className="fas fa-search"/>
            </span>
        </p>
    </div>
);

export default Searchbox;
