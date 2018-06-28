import { h } from "hyperapp";

export interface ITechLogoProps {
    logo: string;
}

export default ({logo}: ITechLogoProps) => (
    <figure className="image is-96x96 }">
        <img src={logo}/>
    </figure>
);
