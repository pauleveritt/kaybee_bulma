import { h } from "hyperapp";

import Author from "./Author";
import Duration from "./Duration";
import References from "./References";
import { IReference, IResource } from "./State";
import TechLogo from "./TechLogo";

interface IResultProps {
    resource: IResource;
}

export default ({resource}: IResultProps) => {

    const referenceValues = resource.references.map(
        (reference: IReference) => (
            {
                key: reference.docname,
                href: reference.href,
                label: reference.label
            }
        ));

    const pr = resource.primary_reference;

    return (
        <div class="kbb-fl-result box">
            <article class="media">
                <div class="media-left">
                    <TechLogo logo={pr ? pr.logo : undefined}/>
                </div>
                <div class="media-content">
                    <div class="content">
                        <p>
                            <a href={resource.href}>
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
                                    href={resource.author.href}
                                    src={resource.author.thumbnailUrl}
                                    title={resource.author.title}
                                />
                            )
                            }
                            <span class="level-item">
                                <References values={referenceValues}/>
                            </span>
                        </div>
                        <div class="level-right is-size-7 has-text-grey">
                            {resource.props.duration && (
                                <Duration duration={resource.props.duration}/>
                            )}
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
