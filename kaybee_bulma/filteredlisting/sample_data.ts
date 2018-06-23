import { IFilterGroup } from "./State";

export const filterGroups1: IFilterGroup[] = [
    {
        label: "Author",
        value: "author",
        control: "checkbox",
        choices: [
            {
                label: "Author One",
                value: "authors/author1",
                checked: false
            },
            {
                label: "Author Two",
                value: "authors/author2",
                checked: true
            }
        ]
    }
];
