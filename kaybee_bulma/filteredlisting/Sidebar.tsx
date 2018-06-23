import { h } from "hyperapp";

interface ISidebarProps {
    flag: string
}

export default ({flag}: ISidebarProps) => (
    <p>
        Sidebar {flag}
    </p>
)
