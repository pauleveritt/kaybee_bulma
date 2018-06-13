export interface IProps {
    [ propname: string ]: any;
}

export interface IResource {
    docname: string;
    title: string;
    parent_docnames: string[];
    rtype: string;
    props
        : IProps;
    excerpt: string;
    published: string;
    duration?: string;
}

export interface IResources {
    [ docname: string ]: IResource;
}

export interface IReference {
    count: number;
    docname: string;
}

export interface IReferenceType {
    [ reftype: string ]: IReference;
}

export interface IReferences {
    [ reftype: string ]: IReferenceType;
}

export interface IDbJson {
    resources: IResources;
    references: IReferences;
}

export interface IFilterChoice {
    label: string;
    value: string;
    checked?: boolean;
}

export interface IFilterGroup {
    label: string;
    value: string;
    control: string;
    choices: IFilterChoice[];
}

export interface IState {
    isFetching: boolean;
    initialDbJson: IDbJson;
    results: IResource[];
    filterGroups: IFilterGroup[];
    filterterm: string;
    filterChoices: any;
    dbUrl: string;
    notification: string;
}

const initialState: IState = {
    isFetching: false,
    initialDbJson: {
        resources: {},
        references: {}
    },
    results: [],
    filterGroups: [],
    filterterm: "",
    filterChoices: {},
    dbUrl: "",
    notification: ""
};

export default initialState;
