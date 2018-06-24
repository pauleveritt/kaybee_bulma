export interface IProps {
    [ propname: string ]: any;
}

export interface IAuthor {
    docname: string;
    title: string;
    props: IProps;
}

export interface IReference {
    reftype: string;
    label: string;
    docname: string;
    title: string;
}

export interface IResource {
    docname: string;
    title: string;
    parent_docnames: string[];
    rtype: string;
    props: IProps;
    excerpt: string;
    published: string;
    author?: IAuthor;
    references: IReference[];
}

export interface IResources {
    [ docname: string ]: IResource;
}

export interface IFilterChoice {
    label: string;
    value: string;
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

export interface IState {
    isFetching: boolean;
    notification: string;
    resources: IResources;
    filterGroups: IFilterGroup[];
    filterTerm: string;
    results: IResource[];
}

const initialState: IState = {
    isFetching: false,
    notification: "Initial State",
    filterGroups: [],
    filterTerm: "",
    resources: {},
    results: []
};

export default initialState;
