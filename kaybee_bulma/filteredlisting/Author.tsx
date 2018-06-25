import { h } from "hyperapp";

export interface IAuthorProps {
    href: string;
    src?: string;
    title: string;
}

export default ({href, src, title}: IAuthorProps) => (
    <a class="level-item kbb-fl-author"
       href={href}>
        <figure class="image is-rounded is-24x24"
                style="margin: 0">
            {src && (
                <img src={src} height="24" width="24"/>
            )
            }
        </figure>
        <span>{title}</span>
    </a>
);
