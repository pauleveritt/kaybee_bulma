import { h } from "hyperapp";

export interface IDurationProps {
    duration?: string;
}

export const Duration = ({duration}: IDurationProps) => {
    return (
        <span class="kbb-fl-duration level-item">
            {duration &&
            <span>
                <span class="icon">
                    <i class="fas fa-video"/>
                </span>
                < span>{duration}</span>
            </span>
            }
        </span>
    );
};

export default Duration;
