import { h } from "hyperapp";

import Result from "./Result";
import { IResource } from "./State";

interface IResultsProps {
    values?: IResource[];
}

export default ({values}: IResultsProps) => {
    if (values) {
        return (
            <div>
                <h2>Resources</h2>
                    {values && Object.values(values).map(resource => (
                        <Result resource={resource}/>
                    ))}
            </div>
        );
    }

    return;
};
