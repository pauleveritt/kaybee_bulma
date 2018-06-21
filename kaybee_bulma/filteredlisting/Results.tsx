import { h } from "hyperapp";

import { IActions } from "./Actions";
import Result from "./Result";
import { IResult, IState } from "./State";

export interface IResultsProps {
    values: IResult[];
}

export const Results = ({values}: IResultsProps) => (state: IState, actions: IActions) => {

    return (
        <div id="kbb-fl-results">
            {values &&
            values.map(({resource, author, references}) => (
                <Result
                    resource={resource}
                    author={author}
                    references={references}
                />
            ))}
        </div>
    );
};

export default Results;
