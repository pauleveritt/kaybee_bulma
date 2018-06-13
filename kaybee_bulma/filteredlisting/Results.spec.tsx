import { app, h } from "hyperapp";
import Results, { getDbUrl } from "./Results";

describe("Results test", () => {
    beforeEach(done => {
        document.body.innerHTML = "";
        const Wrapper = () => (
            <div oncreate={() => done()}>
                <Results/>
            </div>
        );
        app({}, {}, Wrapper, document.body);
    });

    it("should have a heading", () => {
        const h1 = document.querySelector("h1") as HTMLHeadingElement;
        expect(h1.textContent).toBe("Hello");
    });

});

describe("Get DB URL", () => {
    it("should find a data uri", () => {
        document.body.innerHTML = `
<div id="kbb-filteredlisting" data-filteredlistingurl="http://foo.com/db">
    <div class="result"></div>
</div>
`;
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
