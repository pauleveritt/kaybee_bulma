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
                    <div className="control">
                        <label className="radio is-horizontal">
                            <input
                                type="radio"
                                value={choice.value}
                                oninput={({target}: any) => {
                                    choice.checked = target.checked;
                                    actions.setFilterChoice();
                                }}
                            />
                            <span className="kbb-label">{choice.label}</span>
                        </label>
                    </div>
                )
            )
        }
    </div>
);
