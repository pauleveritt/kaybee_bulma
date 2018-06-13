import { resolveUrl } from "./utils";

describe("Resolve URL tests", () => {
    it("should find an image", () => {
        const actual = resolveUrl("a", "b", "c");
        expect(actual).toEqual("");
    });
});
