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
    if (values) {
        return (
            <div>
                <h2>Resources</h2>
                <ul>
                    {values && Object.values(values).map(resource => (
                        <li>{resource.docname}</li>
                    ))}
                </ul>
            </div>
        );
    }

    return;
};

const onCreate = (element: HTMLElement, actions: IActions) => {
    const dbUrl = getDbUrl(element);
    if (dbUrl) {
        actions.getJson(dbUrl);
    }
};

export default (state: IState, actions: IActions) => (
    <div oncreate={(element: HTMLElement) => onCreate(element, actions)}>
        <p>
            <button onclick={() => console.log("State:", actions.getState())}>Dump State</button>
        </p>
        <Fetching isFetching={state.isFetching} actions={actions}/>
        <Notification notification={state.notification} actions={actions}/>
        <Resources values={state.resources}/>
    </div>
);
