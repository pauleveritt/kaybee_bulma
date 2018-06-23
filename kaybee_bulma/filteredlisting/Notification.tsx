import { h } from "hyperapp";

interface INotificationProps {
    notification: string;
}

export default ({notification}: INotificationProps) => {
    if (notification) {
        return (
            <div class="notification is-primary">Notification: {notification}</div>
        );
    }
    return;
};
