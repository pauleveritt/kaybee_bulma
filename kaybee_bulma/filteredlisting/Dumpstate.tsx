import { h } from "hyperapp";

import { IActions } from "./Actions";

interface IDumpstateProps {
    actions: IActions;
}

export default ({actions}: IDumpstateProps) => (
    <p>
        <button onclick={() => console.log("State:", actions.getState())}>Dump State</button>
    </p>
)
