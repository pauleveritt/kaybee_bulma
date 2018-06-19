import { app, h } from "hyperapp";
import Actions from "./Actions";
import Results, { getDbUrl } from "./Results";
import { dbresources1 } from "./sample_resources";
import initialState from "./State";

const innerHtml = `
<div id="kbb-filteredlisting" data-filteredlistingurl="http://foo.com/db">
    <div class="result"></div>
</div>
`;

describe("Results test", () => {
    let onUpdate: (elm: HTMLElement) => void;
    beforeEach(done => {
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
            status: 200,
            statusText: "ok",
            json: () => Promise.resolve({
                resources: dbresources1,
                references: dbresources1
            })
        }));
        document.body.innerHTML = innerHtml;
        const Wrapper = () => (
            <div
                oncreate={() => done()}
                onupdate={(elm: HTMLElement) => {
                    onUpdate(elm);
                }}
            >
                <Results/>
            </div>
        );
        app(initialState, new Actions(), Wrapper, document.body);
    });

    it("should have a heading", done => {
        // const h1 = document.querySelector("h1") as HTMLHeadingElement;
        // expect(h1.textContent).toBe("Hello");
        onUpdate = elm => {
            const ih = document.body.innerHTML;
            expect(ih).toEqual(33);
            done();
        };
    });

});

describe("Get DB URL", () => {
    it("should find a data uri", () => {
        document.body.innerHTML = innerHtml;
        const div = document.querySelector(".result") as HTMLElement;
        const dbUrl = getDbUrl(div);
        expect(dbUrl).toEqual("http://foo.com/db");
    });
    it("should not find a data uri", () => {
        document.body.innerHTML = `
<body>
    <div id="kbb-filteredlisting">
        <div class="result"></div>
    </div>
</body>
`;
        const div = document.querySelector(".result") as HTMLElement;
        const dbUrl = getDbUrl(div);
        expect(dbUrl).toBeUndefined();
    });
});
