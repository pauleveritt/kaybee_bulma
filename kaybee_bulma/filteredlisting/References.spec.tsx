import { app, h } from "hyperapp";
import { IReferenceProps } from "./Reference";
import References from "./References";

describe("References test", () => {
    const references: IReferenceProps[] = [
        {href: "somedoc1", label: "somelabel1"},
        {href: "somedoc2", label: "somelabel2"},
        {href: "somedoc3", label: "somelabel3"},
    ];

    beforeEach(done => {
        document.body.innerHTML = "";
        const Wrapper = () => (
            <div oncreate={() => done()}>
                <References values={references}/>
            </div>
        );
        app({}, {}, Wrapper, document.body);
    });

    it("should have a div.tags", () => {
        const div = document.querySelectorAll("div.tags");
        expect(div.length).toBe(1);
    });

    it("should have three span.tag", () => {
        const spans = document.querySelectorAll("span.tag");
        expect(spans.length).toBe(3);
        const a = document.querySelectorAll("span.tag a")[ 0 ] as HTMLAnchorElement;
        expect(a.href).toEqual(references[ 0 ].href);
        expect(a.text).toEqual(references[ 0 ].label);
    });
});
