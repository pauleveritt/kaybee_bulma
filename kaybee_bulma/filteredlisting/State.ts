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

export interface IState {
    isFetching: boolean;
    notification: string;
    resources?: IResources;
}

const initialState: IState = {
    isFetching: false,
    notification: "Initial State"
};

export default initialState;
