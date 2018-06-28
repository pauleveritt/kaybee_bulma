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

    return (
        <div class="kbb-fl-result box">
            <article class="media">
                <div class="media-left">
                    {(resource.primary_reference && resource.primary_reference.logo) && (
                        <div class="media-right">
                            <TechLogo logo={resource.primary_reference.logo}/>
                        </div>
                    )}
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
                    <nav className="level is-mobile">
                <div className="level-left">
                    {resource.author && (
                        <Author
                            href={resource.author.href}
                            src={resource.author.thumbnailUrl}
                            title={resource.author.title}
                        />
                    )
                    }
                    <span className="level-item">
                                <References values={referenceValues}/>
                            </span>
                </div>
                <div className="level-right is-size-7 has-text-grey">
                    {resource.props.duration && (
                        <Duration duration={resource.props.duration}/>
                    )}
                    <span className="level-item">
                                {resource.props.published}
                            </span>
                </div>
            </nav>
                </div>
            </article>
        </div>
    );
};

/*


<nav className="level is-mobile" style="display:none">
                    <div className="level-left">
                        {resource.author && (
                            <Author
                                href={resource.author.href}
                                src={resource.author.thumbnailUrl}
                                title={resource.author.title}
                            />
                        )
                        }
                        <span className="level-item">
                                <References values={referenceValues}/>
                            </span>
                    </div>
                    <div className="level-right is-size-7 has-text-grey">
                        {resource.props.duration && (
                            <Duration duration={resource.props.duration}/>
                        )}
                        <span className="level-item">
                                {resource.props.published}
                            </span>
                    </div>
                </nav>

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
 */