import { h } from "hyperapp";

interface IPaginationProps {
    flag: string
}

export default ({flag}: IPaginationProps) => (
    <p>
        Pagination {flag}
    </p>
)

