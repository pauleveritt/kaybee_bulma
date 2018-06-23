import { h } from "hyperapp";

import { IActions } from "./Actions";
import { IFilterChoices } from "./State";

interface ISidebarSelectProps {
    choices: IFilterChoices;
    actions: IActions;
}

export default ({choices, actions}: ISidebarSelectProps) => (
    <div>sc</div>
);
