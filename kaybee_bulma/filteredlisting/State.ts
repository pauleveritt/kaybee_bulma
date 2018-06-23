import { filterGroups1 } from "./sample_data";

export interface IProps {
    [ propname: string ]: any;
}

export interface IResource {
    docname: string;
    title: string;
    parent_docnames: string[];
    rtype: string;
    props: IProps;
    excerpt: string;
    published: string;
    author?: IResource;
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
    [label: string]: IFilterChoice;
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
    resources?: IResources;
    filterGroups: IFilterGroup[];
    filterTerm: string;
}

const initialState: IState = {
    isFetching: false,
    notification: "Initial State",
    filterGroups: filterGroups1,
    filterTerm: ""
};

export default initialState;
