import { h } from "hyperapp";

import { IActions } from "./Actions";
import { IFilterChoice } from "./State";

interface ISidebarSelectProps {
    choices: IFilterChoice[];
    actions: IActions;
}

export default ({choices, actions}: ISidebarSelectProps) => (
    <div></div>
);
