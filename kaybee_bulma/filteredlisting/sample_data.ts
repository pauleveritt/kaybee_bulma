import { IFilterGroup } from "./State";

export const filterGroups1: IFilterGroup[] = [
    {
        label: "Author",
        value: "author",
        control: "checkbox",
        choices: {
            author1: {
                label: "Author One",
                value: "authors/author1",
                checked: false
            },
            author2: {
                label: "Author Two",
                value: "authors/author2",
                checked: true
            }
        }
    }
];
