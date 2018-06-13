import { h } from "hyperapp";
import Author, { IAuthorProps } from "./Author";
import Duration from "./Duration";
import { IReferenceProps } from "./Reference";
import References from "./References";
import { IResource } from "./State";

export interface IResultProps {
    resource: IResource;
    author: IResource;
    references: IResource[];
}

const primaryReferenceSrc = "http://konpa.github.io/devicon/devicon.git/icons/react/react-original-wordmark.svg";

export const Result = ({resource, author, references}: IResultProps) => {
    const authorValue: IAuthorProps = {
        href: author.docname,
        src: "src",
        title: author.title
    };
    const referenceValues: IReferenceProps[] = references.map(reference => {
        return {href: reference.docname, label: reference.props.label};
    });
    const durationValue = resource.duration;

    return (
        <div class="kbb-fl-result box">
            <article class="media">
                <div className="media-left">
                    <figure className="image is-96x96 }">
                        <img src={primaryReferenceSrc}/>
                    </figure>
                </div>
                <div className="media-content">
                    <div className="content">
                        <p>
                            <a href={resource.docname}>
                                <strong>{resource.title}</strong>
                            </a>
                            <br/>
                            <span>{resource.excerpt}</span>
                        </p>
                    </div>
                    <nav className="level is-mobile">
                        <div className="level-left">
                            <Author
                                href={authorValue.href}
                                src={authorValue.src}
                                title={authorValue.title}
                            />
                            <span className="level-item">
                                <References values={referenceValues}/>
                            </span>
                        </div>
                        <div className="level-right is-size-7 has-text-grey">
                            <Duration duration={durationValue}/>
                            <span className="level-item">
                                {resource.published}
                            </span>
                        </div>
                    </nav>
                </div>
            </article>
        </div>
    );
};

// noinspection HtmlUnknownTarget
// export const xResult = ({key, resources, references}: IResultProps) => {
//     const result = resources[ key ];
//     const theseReferences: IResourceReferences = result.props.references;
//
//     // Let's make a place for the reference resources
//     const referenceResources: IReferenceResources = {};
//
//     // For each reference scheme, resolve the label -> docname and append
//     /// a resource
//     let primaryAuthor: IResource | null = null;
//     let otherReferences: any = {};
//     if (theseReferences) {
//         Object.entries(theseReferences)
//             .map(([ reftype, reflabels ]) => {
//                 referenceResources[ reftype ] = [];
//                 reflabels.map(reflabel => {
//                     const docname = references[ reftype ][ reflabel ].docname;
//                     const refResource = resources[ docname ];
//                     referenceResources[ reftype ].push(refResource);
//                 });
//             });
//         if (referenceResources.author) {
//             primaryAuthor = referenceResources.author[ 0 ];
//         }
//         otherReferences = {...referenceResources};
//         delete otherReferences.author;
//     }
//
//     // console.log(referenceResources);
//     // // Authors
//     // let primaryAuthorLabel: string | null = null;
//     // let primaryAuthor: IResource | null = null;
//     // if (theseReferences && theseReferences.author) {
//     //     const authors = theseReferences.author;
//     //
//     //     // Get the label for the primary author
//     //     primaryAuthorLabel = authors ? authors[ 0 ] : null;
//     //     if (primaryAuthorLabel) {
//     //         // Get the author docname from the reference, then
//     //         // get the author resource
//     //         const docname = references.author[ primaryAuthorLabel ].docname;
//     //         primaryAuthor = resources[ docname ];
//     //     }
//     // }
//     //
//     // // Non-author references
//     // let otherReferences: IResource[] = [];
//     // if (theseReferences) {
//     //     Object.entries(theseReferences)
//     //         .map(([ reftype, refs ]) => {
//     //             if (reftype !== "author") {
//     //                 refs.map((label: string) => {
//     //                     console.log("label", label);
//     //                 });
//     //             }
//     //         });
//     // }
//     // if (theseReferences) {
//     //     otherReferences = [ resources[ "topics/debugging" ] ];
//     // }
//      const url = "http://konpa.github.io/devicon/devicon.git/icons/react/react-original-wordmark.svg";
//
//     return (
//         <div class="box">
//             <article class="media">
//                 <div class="media-left">
//                     <figure class="image is-96x96 }">
//                         <img
//                             src=""/>
//                     </figure>
//                 </div>
//                 <div class="media-content">
//                     <div class="content">
//                         <p>
//                             <a href="{ result.docname }">
//                                 <strong>{result.title}</strong>
//                             </a>
//                             <br/>
//                             <span>{result.excerpt}</span>
//                         </p>
//                     </div>
//                     <nav class="level is-mobile">
//                         <div class="level-left">
//                             {primaryAuthor && (
//                                 <Author resource={primaryAuthor}/>
//                             )}
//                             <span class="level-item">
//                                 <References resources={otherReferences}/>
//                             </span>
//                         </div>
//                         <div class="level-right is-size-7 has-text-grey">
//                             {result.duration &&
//                             <span class="level-item">
//                                     <span class="icon">
//                                         <i class="fas fa-video"/>
//                                     </span>
//                                     <span>{result.duration}</span>
//                         </span>
//                             }
//                             <span class="level-item">
//                                             {result.published}
//                                         </span>
//                         </div>
//                     </nav>
//                 </div>
//             </article>
//         </div>
//     );
// };

export default Result;
