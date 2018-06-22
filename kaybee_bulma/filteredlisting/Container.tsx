import { h } from "hyperapp";

import { IActions } from "./Actions";
import { IResources, IState } from "./State";
import { getDbUrl } from "./utils";

interface IFetchingProps {
    isFetching: boolean;
    actions: IActions;
}

const Fetching = ({isFetching, actions}: IFetchingProps) => (
    <p>
        <code>isFetching</code>: {isFetching ? "true" : "false"}
        <button onclick={() => actions.setFetching(!isFetching)}>Toggle</button>
    </p>
);

interface INotificationProps {
    notification: string;
    actions: IActions;
}

const Notification = ({notification, actions}: INotificationProps) => (
    <p>
        <code>notification</code>: {notification}
        <button onclick={() => actions.setNotification("Some New Notification")}>Set</button>
    </p>
);

interface IResourcesProps {
    values?: IResources;
}

const Resources = ({values}: IResourcesProps) => {
    return (
        <p>Resources length:
            <ul>
                {values && Object.values(values).map(resource => (
                    <li>{resource.docname}</li>
                ))}
            </ul>
        </p>
    );
};

export default (state: IState, actions: IActions) => (
    <div
        oncreate={(element: HTMLElement) => {
            const dbUrl = getDbUrl(element);
            if (dbUrl) {
                actions.getJson(dbUrl);
            }
        }}
    >
        <p>
            <button onclick={() => console.log("State:", actions.getState())}>Dump State</button>
        </p>
        <Fetching isFetching={state.isFetching} actions={actions}/>
        <Notification notification={state.notification} actions={actions}/>
        <Resources values={state.resources}/>
    </div>
);
