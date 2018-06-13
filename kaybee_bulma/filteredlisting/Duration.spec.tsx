import { app, h } from "hyperapp";
import { default as Duration, IDurationProps } from "./Duration";

describe("Duration test", () => {
    const duration: IDurationProps = {duration: "2m20s"};

    beforeEach(done => {
        document.body.innerHTML = "";
        const Wrapper = () => (
            <div oncreate={() => done()}>
                <Duration {...duration}/>
            </div>
        );
        app({}, {}, Wrapper, document.body);
    });

    it("should have a span.kbb-fl-duration", () => {
        const span = document.querySelectorAll("span.kbb-fl-duration");
        expect(span.length).toBe(1);
    });

    it("should have duration text", () => {
        const text = document.querySelector("span.kbb-fl-duration span") as HTMLSpanElement;
        expect(text.textContent).toEqual("2m20s");
    });
});
