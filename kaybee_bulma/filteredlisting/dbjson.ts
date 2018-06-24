import { IFilterGroup } from "./State";

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
    duration?: string;
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
