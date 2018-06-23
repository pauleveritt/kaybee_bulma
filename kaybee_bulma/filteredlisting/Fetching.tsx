import { h } from "hyperapp";
import { IActions } from "./Actions";

interface IFetchingProps {
    isFetching: boolean;
    actions: IActions;
}

export default ({isFetching, actions}: IFetchingProps) => (
    <p>
        <code>isFetching</code>: {isFetching ? "true" : "false"}
        <button onclick={() => actions.setFetching(!isFetching)}>Toggle</button>
    </p>
);
