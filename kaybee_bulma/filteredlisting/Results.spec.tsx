import { app, h } from "hyperapp";
import Actions from "./Actions";
import Results from "./Results";
import { dbresults1 } from "./sample_resources";
import initialState from "./State";

const innerHtml = `
<div id="kbb-filteredlisting" data-filteredlistingurl="http://foo.com/db">
    <div class="result"></div>
</div>
`;

describe("Results test", () => {
    beforeEach(done => {
        document.body.innerHTML = innerHtml;
        const Wrapper = () => (
            <div oncreate={() => done()}>
                <Results values={dbresults1}/>
            </div>
        );
        app(initialState, new Actions(), Wrapper, document.body);
    });

    it("should have a heading", () => {
        const results = document.querySelectorAll(".kbb-fl-result");
        expect(results.length).toEqual(2);
    });

});

// describe("Get DB URL", () => {
//     it("should find a data uri", () => {
//         document.body.innerHTML = innerHtml;
//         const div = document.querySelector(".result") as HTMLElement;
//         const dbUrl = getDbUrl(div);
//         expect(dbUrl).toEqual("http://foo.com/db");
//     });
//     it("should not find a data uri", () => {
//         document.body.innerHTML = `
// <body>
//     <div id="kbb-filteredlisting">
//         <div class="result"></div>
//     </div>
// </body>
// `;
//         const div = document.querySelector(".result") as HTMLElement;
//         const dbUrl = getDbUrl(div);
//         expect(dbUrl).toBeUndefined();
//     });
// });
