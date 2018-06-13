import { app, h } from "hyperapp";
import { default as Author, IAuthorProps } from "./Author";

describe("Author test", () => {
    const author: IAuthorProps = {
        href: "someauthor", src: "pic.png", title: "Some Author"
    };

    beforeEach(done => {
        document.body.innerHTML = "";
        const Wrapper = () => (
            <div oncreate={() => done()}>
                <Author {...author}/>
            </div>
        );
        app({}, {}, Wrapper, document.body);
    });

    it("should have a a.kbb-author", () => {
        const span = document.querySelectorAll("a.kbb-fl-author");
        expect(span.length).toBe(1);
    });

    it("should have href, src, and title", () => {
        const a = document.querySelector("a.kbb-fl-author") as HTMLAnchorElement;
        expect(a.href).toEqual(author.href);
        const img = document.querySelector("a.kbb-fl-author img") as HTMLImageElement;
        expect(img.src).toEqual(author.src);
        const span = document.querySelector("a.kbb-fl-author span") as HTMLSpanElement;
        expect(span.textContent).toEqual(author.title);
    });
});
