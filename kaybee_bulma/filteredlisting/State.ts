export interface IAuthorInfo {
    title: string;
    href: string;
    headshot: string;
}

export interface IReference {
    href: string;
    label: string;
}

export interface IResult {
    href: string;
    title: string;
    excerpt: string;
    authorInfo: IAuthorInfo;
    references: IReference[];
    duration: string;
    published: string;
    type: string;
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
    initialJson: IResult[];
    results: IResult[];
    filterGroups: IFilterGroup[];
    filterterm: string;
    filterChoices: any;
    dbUrl: string;
}

const initialState: IState = {
    isFetching: false,
    initialJson: [],
    results: [],
    filterGroups: [],
    filterterm: "",
    filterChoices: {},
    dbUrl: ""
};

export default initialState;
