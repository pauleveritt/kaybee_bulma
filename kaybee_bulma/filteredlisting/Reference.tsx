import { h } from "hyperapp";

export interface IReferenceProps {
    key?: string;
    href: string;
    label: string;
}

export default ({href, label}: IReferenceProps) => (
    <span class="tag is-rounded">
            <a href={href}>
                {label}
            </a>
    </span>
);
