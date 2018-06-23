import { h } from "hyperapp";

import { IResource } from "./State";

interface IResultProps {
    resource: IResource;
}

export default ({resource}: IResultProps) => (
    <li>{resource.docname}</li>
);
