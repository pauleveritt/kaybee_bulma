import { h } from "hyperapp";

export interface ITechLogoProps {
    technology: string;
}

interface ILogos {
    [ key: string ]: string;
}

const logos: ILogos = {
    angularjs: "http://konpa.github.io/devicon/devicon.git/icons/angularjs/angularjs-original.svg",
    typescript: "http://konpa.github.io/devicon/devicon.git/icons/typescript/typescript-original.svg",
    debugging: "http://konpa.github.io/devicon/devicon.git/icons/typescript/typescript-original.svg",
    react: "http://konpa.github.io/devicon/devicon.git/icons/react/react-original-wordmark.svg"
};

export default ({technology}: ITechLogoProps) => (
    <figure className="image is-96x96 }">
        <img src={logos[technology]}/>
    </figure>
);
