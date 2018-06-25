import { app, h } from "hyperapp";
import Actions from "./Actions";
import Results from "./Results";
import { dbresults1 } from "./sample_resources";
import initialState from "./State";

const innerHtml = `
<div id="fbb-fl" data-filteredlistingurl="http://foo.com/db">
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
