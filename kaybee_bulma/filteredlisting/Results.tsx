import { h } from "hyperapp";

import { IActions } from "./Actions";
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
        <h1>Hello</h1>
    );
    // const listings = Object.values(state.results);
    //
    // return (
    //     <div
    //         oncreate={(element: HTMLElement) => {
    //             // Get the URL from a data attribute in the HTML
    //             let el = element;
    //             while (el.parentNode) {
    //                 el = el.parentNode as HTMLElement;
    //                 if (el.dataset && el.dataset.filteredlistingurl) {
    //                     const dbUrl = el.dataset.filteredlistingurl;
    //                     if (dbUrl) {
    //                         actions.getJson(dbUrl);
    //                     }
    //                 } else if (el.tagName.toLowerCase() === "body") {
    //                     return;
    //                 }
    //             }
    //         }}
    //     >
    //         {listings && listings.map((resource) => (
    //             <Result
    //                 key={resource.docname}
    //                 resources={state.initialDbJson.resources}
    //                 references={state.initialDbJson.references}
    //             />
    //         ))}
    //     </div>
    // );
};

export default Results;
