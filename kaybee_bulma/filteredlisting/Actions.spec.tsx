import { app, h } from "hyperapp";

import { default as Actions } from "./Actions";
import { default as initialState, IState } from "./State";

describe("Actions", () => {
    let wiredActions = new Actions();

    beforeEach(done => {
        document.body.innerHTML = "";
        const Wrapper = (state: IState, actions: Actions) => (
            <div oncreate={() => done()} />
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

    it("should verify the JSON", async () => {
        // Mock the fetch
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
            status: 200,
            json: () => Promise.resolve({
                resources: {a: 9},
                references: {}
            })
        }));

        expect(initialState.dbUrl).toEqual("");
        const result = await wiredActions.getJson("http://some.where");
        const unpacked = {...result} as IState;
        expect(unpacked.dbUrl).toEqual("http://some.where");
        expect(unpacked.isFetching).toEqual(false);
        expect(unpacked.notification).toEqual("");
        expect(unpacked.initialDbJson.resources).toEqual({a: 9});
    });

    it("should verify the JSON is missing resources", async () => {
        // Mock the fetch
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
            status: 200,
            json: () => Promise.resolve({
                references: {}
            })
        }));

        expect(initialState.dbUrl).toEqual("");
        const result = await wiredActions.getJson("http://some.where");
        const unpacked = {...result} as IState;
        expect(unpacked.dbUrl).toEqual("http://some.where");
        expect(unpacked.isFetching).toEqual(false);
        expect(unpacked.notification).toEqual("Server data missing resources or references");
    });

});
