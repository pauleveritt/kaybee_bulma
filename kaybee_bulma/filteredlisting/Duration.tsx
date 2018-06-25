import { h } from "hyperapp";

export interface IDurationProps {
    duration?: string;
}

export default ({duration}: IDurationProps) => {
    if (duration) {
        return (
            <span className="kbb-fl-duration level-item">
                <span className="icon">
                    <i className="fas fa-video"/>
                </span>
                < span>{duration}</span>
            </span>
        );
    }
    return;
};
