import { app, h } from "hyperapp";
import Result from "./Result";
import { article1, author1, reference1, references1 } from "./sample_resources";

describe("Result test", () => {
    beforeEach(done => {
        document.body.innerHTML = "";
        const Wrapper = () => (
            <div oncreate={() => done()}>
                <Result
                    resource={article1}
                    author={author1}
                    references={references1}
                />
            </div>
        );
        app({}, {}, Wrapper, document.body);
    });

    it("should have a div.filteredlisting-result", () => {
        const div = document.querySelectorAll("div.kbb-fl-result");
        expect(div.length).toBe(1);
    });

    it("should have an author", () => {
        const span = document.querySelectorAll("a.kbb-fl-author");
        expect(span.length).toBe(1);
    });

    it("should have aduration", () => {
        const text = document.querySelector("span.kbb-fl-duration span") as HTMLSpanElement;
        expect(text.textContent).toEqual("2m20s");
    });

    it("should have references", () => {
        const div = document.querySelectorAll("div.tags");
        expect(div.length).toBe(1);
        const allAs = document.querySelectorAll("span.tag a");
        expect(allAs.length).toEqual(2);
        const a1 = allAs[ 0 ] as HTMLAnchorElement;
        expect(a1.href).toEqual(reference1.docname);
        expect(a1.text).toEqual(reference1.props.label);
    });

});
