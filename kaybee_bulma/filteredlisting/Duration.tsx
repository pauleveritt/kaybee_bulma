import { h } from "hyperapp";

export interface IDurationProps {
    duration?: string;
}

export default ({duration}: IDurationProps) => {
    if (duration) {
        return (
            <span class="kbb-fl-duration level-item">
                <span class="icon">
                    <i class="fas fa-video"/>
                </span>
                < span>{duration}</span>
            </span>
        );
    }
    return;
};
