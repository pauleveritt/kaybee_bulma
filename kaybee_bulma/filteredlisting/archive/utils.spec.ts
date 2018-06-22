import { getDbUrl } from "../utils";

const goodInnerHtml = `
<div id="kbb-filteredlisting" data-filteredlistingurl="http://foo.com/db">
    <div class="result"></div>
</div>
`;

const badInnerHtml = `
<body>
    <div id="kbb-filteredlisting">
        <div class="result"></div>
    </div>
</body>
`;

describe("Get DB URL", () => {
    it("should find a data uri", () => {
        document.body.innerHTML = goodInnerHtml;
        const div = document.querySelector(".result") as HTMLElement;
        const dbUrl = getDbUrl(div);
        expect(dbUrl).toEqual("http://foo.com/db");
    });

    it("should not find a data uri", () => {
        document.body.innerHTML = badInnerHtml;
        const div = document.querySelector(".result") as HTMLElement;
        const dbUrl = getDbUrl(div);
        expect(dbUrl).toBeUndefined();
    });
});
