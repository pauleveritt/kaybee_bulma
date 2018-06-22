import { app, h } from "hyperapp";
import Reference, { IReferenceProps } from "./Reference";

describe("Reference test", () => {
    const reference: IReferenceProps = {key: "somedoc", href: "somedoc", label: "somelabel"};

    beforeEach(done => {
        document.body.innerHTML = "";
        const Wrapper = () => (
            <div oncreate={() => done()}>
                <Reference {...reference}/>
            </div>
        );
        app({}, {}, Wrapper, document.body);
    });

    it("should have a span.tag", () => {
        const span = document.querySelectorAll("span.tag");
        expect(span.length).toBe(1);
    });

    it("should have href and label", () => {
        const a = document.querySelector("span.tag a") as HTMLAnchorElement;
        expect(a.href).toEqual(reference.href);
        expect(a.text).toEqual(reference.label);
    });
});
