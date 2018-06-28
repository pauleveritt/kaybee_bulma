import { IFilterGroup, IResource, IResources, IResultInfo } from "./State";

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
    dbReferences: IDbReferences,
    dbUrl: string
): IResources {
    /* Called from actions.setDb to flatten references and populate
    state.resources.
     */

    const newResources: IResources = {};
    Object.entries(dbResources)
        .map(([ docname, dbResource ]: [ string, IDbResource ]) => {

            const newResourceHref = dbUrl + "/../" + dbResource.docname + ".html";

            const newResource: IResource = {
                ...dbResource, references: [], href: newResourceHref
            };

            if (newResource.props.primary_reference) {
                // Take the docname pointed at by primary_reference, get the
                // resource for it, and get the logo property
                const primaryRefResource = dbResources[ newResource.props.primary_reference ];
                newResource.primary_reference = {
                    docname: primaryRefResource.docname,
                    label: primaryRefResource.props.label,
                    title: primaryRefResource.title,
                    logo: primaryRefResource.props.logo
                };
            }

            // Format the published date.
            if (newResource.props.published) {
                const newDate = new Date(newResource.props.published);
                newResource.props.published = newDate.toDateString();
            }

            Object.entries(dbResource.props.references || {})
                .map(([ reftype, reflabels ]: [ string, any ]) => {
                    if (reftype === "author") {
                        // Get the primary author, if any, as a flattened resource
                        const firstAuthorLabel: string = reflabels[ 0 ];
                        const firstAuthorDocname: string = dbReferences
                            .author[ firstAuthorLabel ].docname;
                        const firstAuthor = dbResources[ firstAuthorDocname ];
                        const firstAuthorHref = dbUrl + "/../" + firstAuthor.docname + ".html";
                        let firstAuthorSrc;
                        const firstImages = firstAuthor.props.images;
                        if (firstImages) {
                            firstImages.map(
                                ({usage, filename}: any) => {
                                    if (usage === "icon_24") {
                                        firstAuthorSrc = firstAuthorHref + "/../" + filename;
                                    }
                                }
                            );
                        }
                        if (firstAuthor) {
                            newResource.author = {
                                docname: firstAuthorDocname,
                                href: firstAuthorHref,
                                title: firstAuthor.title,
                                label: firstAuthorLabel,
                                thumbnailUrl: firstAuthorSrc,
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
                            const refResourceHref = dbUrl + "/../" + refResource.docname + ".html";
                            newResource.references.push({
                                reftype,
                                href: refResourceHref,
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
    resources: IResources,
    filterParent: string | undefined) {
    /* Called from setDb to populate state.filterGroups */

    interface INewFilterGroups {
        [ reftyp: string ]: IFilterGroup
    }

    const newFilterGroups: INewFilterGroups = {};
    // Make a filter group for resource types
    newFilterGroups.rtypes = {
        label: "resource type",
        value: "rtype",
        control: "checkbox",
        choices: {}
    };

    // Make a copy of the resources, then filter if needed by the
    // parent_docname if this widget only wants filter information
    // based on place in the tree.
    const filteredResults: IResources = {};
    Object.entries(resources)
        .map(([ docname, resource ]: [ string, IResource ]) => {
            if (!filterParent) {
                filteredResults[ docname ] = resource;
            } else {
                if (resource.parent_docnames.includes(filterParent)) {
                    filteredResults[ docname ] = resource;
                }
            }
        });

    // Iterate through the resources and accumulate IFilterGroup info
    // based on the actual resources, using references to get title etc.
    Object.entries(filteredResults)
        .map(([ docname, resource ]: [ string, IResource ]) => {
            // Keep track of the types that we visit
            if (!newFilterGroups.rtypes.choices[ resource.rtype ]) {
                newFilterGroups.rtypes.choices[ resource.rtype ] = {
                    label: resource.rtype,
                    value: resource.rtype,
                    count: 1
                };
            } else {
                newFilterGroups.rtypes.choices[ resource.rtype ].count++;
            }

            if (resource.props && resource.props.references) {
                Object.entries(resource.props.references)
                    .map(([ reftype, refvalues ]: [ string, any ]) => {
                        // If there's no reftype, make one and set label/count
                        if (!newFilterGroups[ reftype ]) {
                            newFilterGroups[ reftype ] = {
                                label: reftype,
                                value: reftype,
                                control: "checkbox",
                                choices: {}
                            };
                        }
                        const thisRefType = newFilterGroups[ reftype ].choices;
                        refvalues.map(
                            (label: string) => {
                                if (!thisRefType[ label ]) {
                                    const thisRef: IDbReference = references[ reftype ][ label ];
                                    const thisRefResource: IResource = resources[ thisRef.docname ];
                                    thisRefType[ label ] = {
                                        label: thisRefResource.title,
                                        value: thisRefResource.docname,
                                        count: 1
                                    };
                                } else {
                                    thisRefType[ label ].count++;
                                }
                            }
                        );
                    });
            }
        });

    // Now at the end, sort the filter groups by label
    const newFilterGroupList = Object.values(newFilterGroups);
    newFilterGroupList.sort(
        (a: IFilterGroup, b: IFilterGroup) => {
            if (a.label > b.label) {
                return 1;
            } else if (a.label < b.label) {
                return -1;
            }
            return 0;
        }
    );

    return newFilterGroupList;
}

export function sortResults(results: IResource[], resultInfo: IResultInfo) {
    const newResults = [ ...results ];

    // First we sort, ending with a reverse
    newResults.sort(
        (a: IResource, b: IResource) => {
            if (a.props.published > b.props.published) {
                return 1;
            } else if (a.props.published === b.props.published) {
                return -1;
            }
            return 0;
        }
    );
    newResults.reverse();

    return newResults;
}
