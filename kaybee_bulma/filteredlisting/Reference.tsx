import { h } from "hyperapp";

export interface IReferenceProps {
    key?: string;
    href: string;
    label: string;
}

export const Reference = ({href, label}: IReferenceProps) => (
    <span class="tag">
            <a href={href}>
                {label}
            </a>
    </span>
);

export default Reference;
