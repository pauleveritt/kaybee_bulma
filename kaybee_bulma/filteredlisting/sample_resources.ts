import { IFilterGroup, IReferences, IResource, IResources } from "./State";

export const reference1: IResource = {
    docname: "topics/topic1",
    title: "Topic One",
    parent_docnames: [ "topics/index", "index" ],
    rtype: "article",
    props: {label: "topic1"},
    excerpt: "Some excerpt...",
    published: "2018/01/01 12:00PM",
};

export const reference2: IResource = {
    docname: "topics/topic2",
    title: "Topic Two",
    parent_docnames: [ "topics/index", "index" ],
    rtype: "article",
    props: {label: "topic2"},
    excerpt: "Some excerpt...",
    published: "2018/01/01 12:00PM",
};

export const references1 = [ reference1, reference2 ];

export const author1: IResource = {
    docname: "authors/author1",
    title: "Author One",
    parent_docnames: [ "authors/index", "index" ],
    rtype: "article",
    excerpt: "Some excerpt...",
    published: "2018/01/01 12:00PM",
    props: {}
};

export const article1: IResource = {
    docname: "articles/article1",
    title: "Article One",
    parent_docnames: [ "articles/index", "index" ],
    rtype: "article",
    props: {
        references: {
            author: [ author1.docname ],
            topics: [ reference1.docname, reference2.docname ]
        }
    },
    excerpt: "Some excerpt...",
    published: "2018/01/01 12:00PM",
    duration: "2m20s"
};

export const article2: IResource = {
    docname: "articles/article2",
    title: "Article Two",
    parent_docnames: [ "articles/index", "index" ],
    rtype: "article",
    props: {
        references: {
            author: [ author1.docname ],
            topics: [ reference1.docname, reference2.docname ]
        }
    },
    excerpt: "Some excerpt again...",
    published: "2018/01/01 12:00PM",
    duration: "2m20s"
};

export const dbresources1: IResources = {article1, article2, "authors/author1": author1};
export const dbreferences1: IReferences = {
    topic: {
        topic1: {count: 19, docname: reference1.docname},
        topic2: {count: 29, docname: reference2.docname}
    }
};

// Used in the <Results values={}/> component
export const dbresults1 = [
    {
        resource: article1,
        author: author1,
        references: [ reference1, reference2 ]
    },
    {
        resource: article2,
        author: author1,
        references: [ reference1, reference2 ]
    }
];

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
            }
        ]
    }
];
