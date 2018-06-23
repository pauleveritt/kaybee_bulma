import { h } from "hyperapp";

import { IActions } from "./Actions";

interface ISearchboxProps {
    actions: IActions
}

export default ({actions}: ISearchboxProps) => (
    <div className="field">
        <p className="control is-expanded has-icons-left">
            <input
                className="input"
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
)
