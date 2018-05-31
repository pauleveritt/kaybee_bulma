import { h } from "hyperapp";
import { IActions } from "./Actions";
import { IResult, IState } from "./State";

interface IResultProps {
    key: string;
    result: IResult;
}

// noinspection HtmlUnknownTarget
export const Result = ({result}: IResultProps) => (
    <div className="box">
        <article className="media">
            <div className="media-left">
                <figure className="image is-96x96 }">
                    <img
                        src="http://konpa.github.io/devicon/devicon.git/icons/react/react-original-wordmark.svg"/>
                </figure>
            </div>
            <div className="media-content">
                <div className="content">
                    <p>
                        <a href="{ result.href }">
                            <strong>{result.title}</strong>
                        </a>
                        <br/>
                        <span>{result.excerpt}</span>
                    </p>
                </div>
                <nav className="level is-mobile">
                    <div className="level-left">
                        <a className="level-item kbb-author"
                           href="{ result.href }">
                            <figure className="image is-rounded is-24x24"
                                    style="margin: 0">
                                <img src={result.authorInfo.headshot}/>
                            </figure>
                            <span>{result.authorInfo.title}</span>
                        </a>
                        <span className="level-item">
                            <div className="tags">
                                {result.references.map(reference => (
                                        <span className="tag">
                                        <a href="{ reference.href }">
                                            {reference.label}
                                        </a>
                                    </span>
                                    )
                                )}
                            </div>
                        </span>
                    </div>
                    <div className="level-right is-size-7 has-text-grey">
                        {result.duration &&
                        <span className="level-item">
                                    <span className="icon">
                                        <i className="fas fa-video"/>
                                    </span>
                                    <span>{result.duration}</span>
                        </span>
                        }
                        <span className="level-item">
                                            {result.published}
                                        </span>
                    </div>
                </nav>
            </div>
        </article>
    </div>
);

export const Results = () => (state: IState, actions: IActions) => (
    <div
        oncreate={(element: HTMLElement) => {
            let el = element;
            while (el.parentNode) {
                el = el.parentNode as HTMLElement;
                if (el.dataset && el.dataset.filteredlistingurl) {
                    const dbUrl = el.dataset.filteredlistingurl;
                    if (dbUrl) {
                        actions.getInitialJson(dbUrl);
                    }
                } else if (el.tagName.toLowerCase() === "body") {
                    return;
                }
            }
        }}
    >
        {state.results.map((resource) => (
            <Result key={resource.href} result={resource}/>
        ))}
    </div>
);

export default Results;
