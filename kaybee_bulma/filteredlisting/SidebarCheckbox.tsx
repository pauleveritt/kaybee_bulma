import { h } from "hyperapp";

import { IActions } from "./Actions";
import { IFilterChoice, IFilterChoices } from "./State";

interface ISidebarCheckboxProps {
    choices: IFilterChoices;
    actions: IActions;
}

export default ({choices, actions}: ISidebarCheckboxProps) => (
    <div>
        {
            Object.values(choices).map((choice: IFilterChoice) => (
                <div class="control">
                    <label class="checkbox is-horizontal">
                        <input
                            type="checkbox"
                            name={choice.value}
                            checked={choice.checked}
                            oninput={({target}: any) => {
                                choice.checked = target.checked;
                                actions.setFilterChoice();
                                actions.filterResults();
                            }}
                        />
                        <span class="kbb-label">{choice.label}</span>
                    </label>
                </div>
            ))
        }
    </div>
);
