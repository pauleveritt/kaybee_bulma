import { h } from "hyperapp";

import { IActions } from "./Actions";
import Result from "./Result";
import { article1, author1, reference1, references1 } from "./sample_resources";
import { IState } from "./State";

export function getDbUrl(el: HTMLElement) {
    let dbUrl: string | null = "";
    while (el.parentNode) {
        el = el.parentNode as HTMLElement;
        dbUrl = el.getAttribute("data-filteredlistingurl");
        if (dbUrl) {
            return dbUrl;
        } else if (el.tagName.toLowerCase() === "body") {
            return;
        }
    }
}

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
