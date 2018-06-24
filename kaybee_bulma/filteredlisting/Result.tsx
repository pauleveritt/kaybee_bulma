import { h } from "hyperapp";

import Author from "./Author";
import Duration from "./Duration";
import References from "./References";
import { IReference, IResource } from "./State";

interface IResultProps {
    resource: IResource;
}

const primaryReferenceSrc = "http://konpa.github.io/devicon/devicon.git/icons/react/react-original-wordmark.svg";

export default ({resource}: IResultProps) => {

    const referenceValues = resource.references.map(
        (reference: IReference) => (
            {
                key: reference.docname,
                href: "xxx",
                label: "xyzpdq123"
            }
        ));

    return (
        <div class="kbb-fl-result box">
            <article class="media">
                <div class="media-left">
                    <figure class="image is-96x96 }">
                        <img src={primaryReferenceSrc}/>
                    </figure>
                </div>
                <div class="media-content">
                    <div class="content">
                        <p>
                            <a href={resource.docname}>
                                <strong>{resource.title}</strong>
                            </a>
                            <br/>
                            <span>{resource.excerpt}</span>
                        </p>
                    </div>
                    <nav class="level is-mobile">
                        <div class="level-left">
                            {resource.author && (
                                <Author
                                    href={resource.author.docname}
                                    src={resource.author.docname}
                                    title={resource.author.title}
                                />
                            )
                            }
                            <span class="level-item">
                                <References values={referenceValues}/>
                            </span>
                        </div>
                        <div class="level-right is-size-7 has-text-grey">
                            <Duration duration={"2h22m2s"}/>
                            <span class="level-item">
                                {resource.props.published}
                            </span>
                        </div>
                    </nav>
                </div>
            </article>
        </div>
    );
};
