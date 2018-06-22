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
