import { IResource } from "./State";

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
            topics: [ reference1, reference2 ]
        }
    },
    excerpt: "Some excerpt...",
    published: "2018/01/01 12:00PM",
    duration: "2m20s"
};
