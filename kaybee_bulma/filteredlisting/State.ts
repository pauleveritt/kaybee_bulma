export interface IProps {
    [ propname: string ]: any;
}

export interface IAuthor {
    docname: string;
    href: string;
    title: string;
    label: string;
    thumbnailUrl?: string;
    headshotUrl?: string;
    props: IProps;
}

export interface IPrimaryReference {
    docname: string;
    label: string;
    title: string;
    logo?: string;
}

export interface IReference {
    reftype: string;
    label: string;
    docname: string;
    href: string;
    title: string;
}

export interface IResource {
    docname: string;
    href: string;
    title: string;
    parent_docnames: string[];
    rtype: string;
    props: IProps;
    excerpt: string;
    published: string;
    author?: IAuthor;
    references: IReference[];
    primary_reference?: IPrimaryReference;
}

export interface IResources {
    [ docname: string ]: IResource;
}

export interface IFilterChoice {
    label: string;
    value: string;
    count: number;
    checked?: boolean;
}

export interface IFilterChoices {
    [ label: string ]: IFilterChoice;
}

export interface IFilterGroup {
    label: string;
    value: string;
    control: string;
    choices: IFilterChoices;
}

export interface IResultInfo {
    sortKey: string;
    batchSize: number;
    start: number;
}

export interface IState {
    dbUrl?: string;
    filterParent?: string;
    isFetching: boolean;
    notification: string;
    resources: IResources;
    filterGroups: IFilterGroup[];
    filterTerm: string;
    results: IResource[];
    resultInfo: IResultInfo;
}

const initialState: IState = {
    isFetching: false,
    notification: "Initial State",
    filterGroups: [],
    filterTerm: "",
    resources: {},
    results: [],
    resultInfo: {
        sortKey: "published",
        batchSize: 10,
        start: 0
    }
};

export default initialState;
