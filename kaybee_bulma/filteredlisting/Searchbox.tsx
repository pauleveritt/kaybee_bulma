import { h } from "hyperapp";

interface ISearchboxProps {
    flag: string
}

export default ({flag}: ISearchboxProps) => (
    <p>
        Searchbox {flag}
    </p>
)
