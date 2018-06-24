import { h } from "hyperapp";

import { IActions } from "./Actions";

interface ISearchboxProps {
    actions: IActions
}

export default ({actions}: ISearchboxProps) => (
    <div class="field">
        <p class="control is-expanded has-icons-left">
            <input
                class="input"
                type="text"
                placeholder="Filter listing..."
                autoFocus
                onkeyup={
                    ({target: v}: any) => {
                        actions.setFilterTerm(v.value);
                        actions.filterResults();
                    }}
            />
            <span class="icon is-small is-left">
              <i class="fas fa-search"/>
            </span>
        </p>
    </div>
)
