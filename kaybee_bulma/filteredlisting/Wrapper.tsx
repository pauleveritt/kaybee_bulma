import { h } from "hyperapp";

import { IActions } from "./Actions";
import Result from "./Result";
import { article1, author1, references1 } from "./sample_resources";
import { IState } from "./State";

export const Results = () => (state: IState, actions: IActions) => {

    return (
        <div
            oncreate={(element: HTMLElement) => {
                // Get the URL from a data attribute in the HTML
                const dbUrl = getDbUrl(element);
                if (dbUrl) {
                    actions.getJson(dbUrl);
                }
            }}
        >{state.results.length}xX
            {state.results && Object.values(state.results).map((resource) => (
                <Result
                    resource={article1}
                    author={author1}
                    references={references1}
                />
            ))}
        </div>
    );
};

export default Results;
