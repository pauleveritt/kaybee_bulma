import { h } from "hyperapp";

import { default as Reference, IReferenceProps } from "./Reference";

export interface IReferencesProps {
    values: IReferenceProps[];
}

export const References = ({values}: IReferencesProps) => (
    <div class="tags">
        {values.map(reference => (
                <Reference
                    key={reference.href}
                    href={reference.href}
                    label={reference.label}
                />
            )
        )}
    </div>
);

export default References;
