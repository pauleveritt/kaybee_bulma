import { app, h } from "hyperapp";

import {
    default as Actions,
    filterValues,
    flattenResults,
    generateResults,
    getFilterGroupValues
} from "./Actions";
import { article1, author1, dbreferences1, dbresources1, filterGroups1 } from "./sample_resources";
import { default as initialState, IDbJson, IFilterGroup, IReference, IResource, IState } from "./State";

describe("Actions Unit Tests", () => {
    let wiredActions = new Actions();

    beforeEach(done => {
        document.body.innerHTML = "";
        const Wrapper = (state: IState, actions: Actions) => (
            <div oncreate={() => done()}/>
        );
        wiredActions = app(initialState, new Actions(), Wrapper, document.body);
    });

    it("should toggle fetching", () => {
        expect(initialState.isFetching).toEqual(false);
        const result = wiredActions.toggleFetching(true);
        expect(result.isFetching).toEqual(true);
    });

    it("should set notification", () => {
        expect(initialState.notification).toEqual("");
        const result = wiredActions.setNotification("123");
        expect(result.notification).toEqual("123");
    });

    it("should fail with no server response", async () => {
        // Mock the fetch
        const statusText = "No server at that URL";
        window.fetch = jest.fn().mockImplementation(() => Promise.reject(
            new Error(statusText)
        ));

        expect(initialState.dbUrl).toEqual("");
        const result = await wiredActions.getJson("http://some.where");
        const unpacked = {...result} as IState;
        expect(unpacked.dbUrl).toEqual("http://some.where");
        expect(unpacked.isFetching).toEqual(false);
        expect(unpacked.notification).toEqual("No server at that URL");
    });

    it("should fail when a server returns failed status code", async () => {
        // Mock the fetch
        const statusText = "some test failed server response";
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
            status: 500,
            statusText
        }));

        expect(initialState.dbUrl).toEqual("");
        const result = await wiredActions.getJson("http://some.where");
        const unpacked = {...result} as IState;
        expect(unpacked.dbUrl).toEqual("http://some.where");
        expect(unpacked.isFetching).toEqual(false);
        expect(unpacked.notification).toEqual(statusText);
    });

    it("should set initial JSON", async () => {
        const dbJson: IDbJson = {
            resources: dbresources1,
            references: dbreferences1
        };
        const result = await wiredActions.setJson(dbJson);
        const unpacked = {...result} as IState;
        const resource1: IResource = unpacked.initialDbJson.resources.article1;
        expect(resource1.docname).toEqual(dbresources1.article1.docname);
        const topic1: IReference = unpacked.initialDbJson.references.topic.topic1;
        expect(topic1.count).toEqual(dbreferences1.topic.topic1.count);
        const results = unpacked.results;
        expect(results.length).toEqual(3);
    });
});

describe("Get Filter Groups", () => {
    let filterGroups: IFilterGroup[] = [];

    it("should be empty with no filter groups", () => {
        filterGroups = [];
        const result = getFilterGroupValues(filterGroups);
        expect(result).toEqual([]);
    });
    it("should find a filter group value when true", () => {
        filterGroups = [ ...filterGroups1 ];
        filterGroups[ 0 ].choices[ 0 ].checked = true;
        const result = getFilterGroupValues(filterGroups);
        expect(result).toEqual([ [ "author", "authors/author1" ] ]);
    });
    it("should not find a filter group value when false", () => {
        filterGroups = [ ...filterGroups1 ];
        filterGroups[ 0 ].choices[ 0 ].checked = false;
        const result = getFilterGroupValues(filterGroups);
        expect(result).toEqual([]);
    });
});

describe("Filter Values", () => {
    it("should return all values when no filterKeysValues", () => {
        const fKV: Array<[ string, string ]> = [];
        const resources = Object.values(dbresources1);
        const result = filterValues(resources, fKV);
        expect(result).toEqual(resources);
    });
    it("should return all values when one filterKeysValues", () => {
        const fKV: Array<[ string, string ]> = [ [ "rtype", "article" ] ];
        const resources = Object.values(dbresources1);
        const result = filterValues(resources, fKV);
        expect(result).toEqual(resources);
    });
    it("should return all values when one of multiple", () => {
        const fKV: Array<[ string, string ]> = [
            [ "rtype", "article" ],
            [ "rtype", "xyzpdq" ],
        ];
        const resources = Object.values(dbresources1);
        const result = filterValues(resources, fKV);
        expect(result).toEqual(resources);
    });
});

describe("Flatten Results", () => {
    const filteredResources: IResource[] = Object.values(dbresources1);
    it("should flatten author and references", () => {
        const results = flattenResults(filteredResources, dbresources1);
        const author = results[ 0 ].author as IResource;
        const theseReferences = results[ 0 ].references;
        expect(author.docname).toEqual(author1.docname);
        expect(theseReferences[ 0 ].docname).toEqual(author1.docname);
    });
});

describe("Generate Results", () => {
    const dbjson: IDbJson = {
        resources: dbresources1,
        references: dbreferences1
    };
    let filterGroups: IFilterGroup[] = [];

    beforeEach(() => {
        filterGroups = [ ...filterGroups1 ];
    });
    it("should parse resources into results with no filtering", () => {
        const results = generateResults(dbjson, "", []);
        expect(results.length).toEqual(3);
    });
    it("should filter on title", () => {
        const results = generateResults(dbjson, "one", []);
        expect(results.length).toEqual(2);
    });
    it("should filter on mixed case title", () => {
        const results = generateResults(dbjson, "ONe", []);
        expect(results.length).toEqual(2);
        expect(results[ 0 ].resource.docname).toEqual(article1.docname);
    });
    it("should not filter on false filter groups", () => {
        const results = generateResults(dbjson, "", filterGroups);
        expect(results.length).toEqual(3);
    });
    it("should filter on true filter groups for no matches", () => {
        filterGroups[ 0 ].choices[ 0 ].checked = true;
        expect(generateResults(dbjson, "", filterGroups))
            .toEqual([]);
    });
});
