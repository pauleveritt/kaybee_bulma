import { h } from "hyperapp";

import { IActions } from "./Actions";
import SidebarCheckbox from "./SidebarCheckbox";
import SidebarRadio from "./SidebarRadio";
import SidebarSelect from "./SidebarSelect";
import { IFilterGroup, IFilterGroups } from "./State";

interface ISidebarProps {
    filterGroups: IFilterGroups;
    actions: IActions;
}

export default ({filterGroups, actions}: ISidebarProps) => (
    <div>
        {Object.values(filterGroups).map((fg: IFilterGroup) => {
                if (Object.keys(fg.choices).length) {
                    return (
                        <div class="kbb-sidebargroup">
                            <p class="menu-label">
                                {fg.label} {fg.choices}
                            </p>
                            {(() => {
                                switch (fg.control) {
                                    case "checkbox":
                                        return <SidebarCheckbox
                                            choices={fg.choices}
                                            actions={actions}
                                        />;
                                    case "radio":
                                        return <SidebarRadio
                                            choices={fg.choices}
                                            actions={actions}
                                        />;
                                    case "select":
                                        return <SidebarSelect
                                            choices={fg.choices}
                                            actions={actions}
                                        />;
                                    default:
                                        return null;
                                }
                            })()}
                        </div>
                    );
                }
                return;
            }
        )}
    </div>
)
