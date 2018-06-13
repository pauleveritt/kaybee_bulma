import { app, h } from "hyperapp";

import { default as Actions } from "./Actions";
import { dbreferences1, dbresources1 } from "./sample_resources";
import { default as initialState, IDbJson, IReference, IResource, IState } from "./State";

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
    });
});
