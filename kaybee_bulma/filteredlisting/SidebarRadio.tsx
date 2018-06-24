import { h } from "hyperapp";

import { IActions } from "./Actions";
import { IFilterChoice, IFilterChoices } from "./State";

interface ISidebarRadioProps {
    choices: IFilterChoices;
    actions: IActions;
}

export default ({choices, actions}: ISidebarRadioProps) => (
    <div>
        {
            Object.values(choices).map(
                (choice: IFilterChoice) => (
                    <div class="control">
                        <label class="radio is-horizontal">
                            <input
                                type="radio"
                                value={choice.value}
                                oninput={({target}: any) => {
                                    choice.checked = target.checked;
                                    actions.setFilterChoice();
                                }}
                            />
                            <span class="kbb-label">{choice.label}</span>
                        </label>
                    </div>
                )
            )
        }
    </div>
);
