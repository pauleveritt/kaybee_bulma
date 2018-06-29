import { h } from "hyperapp";

export interface ITechLogoProps {
    logo?: string;
}

const pythonLogo = "https://cdn.worldvectorlogo.com/logos/python-5.svg";

export default ({logo}: ITechLogoProps) => (
    <figure class="image is-64x64 }">
        <img src={logo ? logo : pythonLogo}/>
    </figure>
);
