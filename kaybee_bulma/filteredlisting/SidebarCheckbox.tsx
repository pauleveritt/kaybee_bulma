import { h } from "hyperapp";

import { IFilterChoice } from "./State";
import { IActions } from "./Actions";

interface ISidebarCheckboxProps {
    choices: IFilterChoice[];
    actions: IActions;
}

export default ({choices, actions}: ISidebarCheckboxProps) => (
    <div>
        {
            choices.map((choice: IFilterChoice) => (
                <div className="control">
                    <label className="checkbox is-horizontal">
                        <input
                            type="checkbox"
                            name={choice.value}
                            checked={choice.checked}
                            onInput={({target}: any) => {
                                choice.checked = target.checked;
                                // actions.setFilterChoice();
                            }}
                        />
                        <span className="kbb-label">{choice.label}</span>
                    </label>
                </div>
            ))
        }
    </div>
);
