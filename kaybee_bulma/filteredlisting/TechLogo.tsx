import { h } from "hyperapp";

export interface ITechLogoProps {
    logo: string;
}

export default ({logo}: ITechLogoProps) => (
    <figure class="image is-96x96 }">
        <img src={logo}/>
    </figure>
);
