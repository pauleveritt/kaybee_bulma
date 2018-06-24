import { IFilterGroup, IResource, IResources } from "./State";

export interface IDbProps {
    [ propname: string ]: any;
}

export interface IDbResource {
    docname: string;
    title: string;
    parent_docnames: string[];
    rtype: string;
    props: IDbProps;
    excerpt: string;
    published: string;
}

export interface IDbResources {
    [ docname: string ]: IDbResource;
}

export interface IDbReference {
    count: number;
    docname: string;
}

export interface IDbReferenceType {
    [ reftype: string ]: IDbReference;
}

export interface IDbReferences {
    [ reftype: string ]: IDbReferenceType;
}

export interface IDbJson {
    resources: IDbResources;
    references: IDbReferences;
}

/* Some conversion functions for working with external data */

export function setResources(
    dbResources: IDbResources,
    dbReferences: IDbReferences
): IResources {
    /* Called from actions.setDb to flatten references and populate
    state.resources.
     */

    const newResources: IResources = {};
    Object.entries(dbResources)
        .map(([ docname, dbResource ]: [ string, IDbResource ]) => {
            const newResource: IResource = {...dbResource, references: []};

            Object.entries(dbResource.props.references || {})
                .map(([ reftype, reflabels ]: [ string, any ]) => {
                    if (reftype === "author") {
                        // Get the primary author, if any, as a flattened resource
                        const firstAuthorLabel: string = reflabels[ 0 ];
                        const firstAuthorDocname: string = dbReferences
                            .author[ firstAuthorLabel ].docname;
                        const firstAuthor = dbResources[ firstAuthorDocname ];
                        if (firstAuthor) {
                            newResource.author = {
                                docname: firstAuthorDocname,
                                title: firstAuthor.title,
                                label: firstAuthorLabel,
                                props: {...firstAuthor.props}
                            };
                        }
                    } else {
                        // Handle other kinds of references
                        newResource.references = [];
                        reflabels.map((reflabel: string) => {
                            // Get the reference for this label
                            const refDocname = dbReferences[ reftype ][ reflabel ].docname;
                            const refResource = dbResources[ refDocname ];
                            newResource.references.push({
                                reftype,
                                label: reflabel,
                                docname: refDocname,
                                title: refResource.title
                            });
                        });
                    }
                });
            newResources[ docname ] = newResource;
        });

    return newResources;
}

export function setFilterGroups(
    references: IDbReferences,
    resources: IDbResources) {
    /* Called from setDb to populate state.filterGroups */

    const newFilterGroups: IFilterGroup[] = [];

    // Iterate through the references and convert to filterGroups
    Object.entries(references)
        .map(([ reftype, refvalue ]: [ string, IDbReferenceType ]) => {
            const newFilterGroup: IFilterGroup = {
                label: reftype,
                value: reftype,
                control: "checkbox",
                choices: {}
            };
            Object.entries(refvalue)
                .map(([ label, refinfo ]: [ string, IDbReference ]) => {
                    if (refinfo.count) {
                        // There are some references for this, so show
                        // it. Get the resource to get the label
                        // and the value.
                        const docname = refinfo.docname;
                        const resource = resources[ docname ];
                        const title = resource.title;
                        newFilterGroup.choices[ label ] = {
                            label: title,
                            value: docname,
                            checked: false
                        };
                    }
                });
            newFilterGroups.push(newFilterGroup);
        });

    return newFilterGroups;
}
