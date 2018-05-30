import { h } from "hyperapp";
import { IFilterChoice, IFilterGroup, IState } from "./State";
import { IActions } from "./Actions";

interface ISidebargroupProps {
    choices: IFilterChoice[];
}

export const SidebarCheckbox = ({choices}: ISidebargroupProps) =>
    (state: IState, actions: IActions) => (
        <div>
            {
                choices.map(
                    (choice: IFilterChoice) => (
                        <div className="control">
                            <label className="checkbox is-horizontal">
                                <input
                                    type="checkbox"
                                    name={choice.value}
                                    checked={choice.checked}
                                    oninput={({target}: any) => {
                                        choice.checked = target.checked;
                                        actions.setFilterChoice();
                                    }}
                                />
                                <span className="kbb-label">{choice.label}</span>
                            </label>
                        </div>
                    )
                )
            }
        </div>
    );

export const SidebarRadio = ({choices}: ISidebargroupProps) => (
    <div>
        {
            choices.map(
                (choice: IFilterChoice) => (
                    <div className="control">
                        <label className="radio is-horizontal">
                            <input
                                type="radio"
                                value={choice.value}
                                oninput={(e: any) => console.log("e", e.target.name, e.target.value)}
                            />
                            <span className="kbb-label">{choice.label}</span>
                        </label>
                    </div>
                )
            )
        }
    </div>
);
export const SidebarSelect = ({choices}: ISidebargroupProps) => (
    <div className="select is-multiple">
        <select multiple size="4">
            {
                choices.map(
                    (choice: IFilterChoice) => (
                        <option value={choice.value}>{choice.label}</option>
                    )
                )
            }
        </select>
    </div>
);

export const Sidebar = () => ({filterGroups}: IState) => (
    <div>
        {filterGroups.map((fg: IFilterGroup) => (
                <div class="kbb-sidebargroup">
                    <p class="menu-label">
                        {fg.label}
                    </p>
                    <p>
                        <button onclick={() => console.log(fg.choices)}>Dump Choices</button>
                    </p>
                    {(() => {
                        switch (fg.control) {
                            case "checkbox":
                                return <SidebarCheckbox choices={fg.choices}/>;
                            case "radio":
                                return <SidebarRadio choices={fg.choices}/>;
                            case "select":
                                return <SidebarSelect choices={fg.choices}/>;
                            default:
                                return null;
                        }
                    })()}
                </div>
            )
        )}
    </div>
);

export default Sidebar;
