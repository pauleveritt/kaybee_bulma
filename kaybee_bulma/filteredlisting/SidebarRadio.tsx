import { h } from "hyperapp";

import { IActions } from "./Actions";
import { IFilterChoice } from "./State";

interface ISidebarRadioProps {
    choices: IFilterChoice[];
    actions: IActions;
}

export default ({choices, actions}: ISidebarRadioProps) => (
    <div>
        {
            choices.map(
                (choice: IFilterChoice) => (
                    <div className="control">
                        <label className="radio is-horizontal">
                            <input
                                type="radio"
                                value={choice.value}
                                onInput={(e: any) => console.log("e", e.target.name, e.target.value)}
                            />
                            <span className="kbb-label">{choice.label}</span>
                        </label>
                    </div>
                )
            )
        }
    </div>
);
