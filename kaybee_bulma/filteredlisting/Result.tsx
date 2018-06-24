import { h } from "hyperapp";

import { IResource } from "./State";

interface IResultProps {
    resource: IResource;
}

export default ({resource}: IResultProps) => (
    <li>{resource.docname}, author: {resource.author ? resource.author.title : "None: " + resource.docname}</li>
);
