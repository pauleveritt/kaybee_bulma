import { h } from "hyperapp";

import Result from "./Result";
import { IResources } from "./State";

interface IResultsProps {
    values?: IResources;
}

export default ({values}: IResultsProps) => {
    if (values) {
        return (
            <div>
                <h2>Resources</h2>
                <ul>
                    {values && Object.values(values).map(resource => (
                        <Result resource={resource}/>
                    ))}
                </ul>
            </div>
        );
    }

    return;
};
