import { IDbReferences, IDbResources, setFilterGroups, setResources } from "./dbjson";
import { IFilterChoices, IFilterGroups, IResource, IResources } from "./State";

import catalog from "../../docs/_build/catalog.json";

const dbResources: IDbResources = catalog.resources;
const dbReferences: IDbReferences = catalog.references;

interface IReducedFilterGroups {
    [ reftype: string ]: string[];
}

function reduceFilterGroups(fgs: IFilterGroups): IReducedFilterGroups {
    const newFilterGroups: any = {};
    Object.values(fgs)
        .map(fg => {
            const trueChoices = Object.values(fg.choices).map(
                // If the checkbox is checked, keep it. Otherwise, if
                // not present or checked is false, filter out this choice.
                choice => choice.checked ? choice.value : false
            ).filter(v => v);
            if (trueChoices) {
                newFilterGroups[ fg.value ] = trueChoices;
            }
        });

    return newFilterGroups;
}

function filterResourceGroup(
    reducedGroups: IReducedFilterGroups,
    reftype: string,
    resource: IResource) {

    // Compare which items are checked against this resource's
    // references for the reftype
    const checkedReferences = reducedGroups[ reftype ];
    if (checkedReferences.length === 0) {
        // Nothing is checked, so automatically true
        return true;
    }
    const resourceReferences: string[] = resource.references
        .filter(reference => reference.reftype === reftype)
        .map(reference => reference.docname);

    return resourceReferences.some((label: string) => checkedReferences.includes(label));
}

function filterResourceGroups(
    reducedGroups: IReducedFilterGroups,
    resource: IResource) {

    // First get the filter reftypes with non-empty selections
    const nonEmptyFilterGroups: string[] = [];
    Object.entries(reducedGroups).map(([ k, v ]) => {
        if (v.length) {
            nonEmptyFilterGroups.push(k);
        }
    });
    const results: boolean[] = nonEmptyFilterGroups
        .map(reftype => filterResourceGroup(reducedGroups, reftype, resource));

    const keepResult = !results.includes(false);
    return keepResult;
}

describe("Reduce Filter Groups", () => {
    let resources: IResources = {};
    let filterGroups: IFilterGroups = {};

    beforeEach(() => {
        resources = setResources(dbResources, dbReferences, "xxx");
        filterGroups = setFilterGroups(dbReferences, resources, undefined);
    });

    it("should reduce originals to be all undefined", () => {
        const result = reduceFilterGroups(filterGroups);
        expect(Object.keys(result)).toEqual([ "rtype", "category", "author" ]);
        expect(result.rtype).toEqual([]);
        expect(result.author).toEqual([]);
        expect(result.category).toEqual([]);
    });

    it("should reduce category with one selection to be true", () => {
        const categoryChoices: IFilterChoices = filterGroups.category.choices;
        categoryChoices.angular.checked = true;
        categoryChoices.react.checked = false;
        const result = reduceFilterGroups(filterGroups);
        expect(result.category).toEqual([ "categories/angular" ]);
    });

});

describe("Select Resources Single Filter Group", () => {
    let resources: IResources = {};
    let filterGroups: IFilterGroups = {};

    beforeEach(() => {
        resources = setResources(dbResources, dbReferences, "xxx");
        filterGroups = setFilterGroups(dbReferences, resources, undefined);
    });

    it("should match one group when no checkboxes selected", () => {
        const reducedFilterGroups: IReducedFilterGroups = reduceFilterGroups(filterGroups);
        const resource1 = resources[ "articles/customizing/layout" ];
        const result = filterResourceGroup(reducedFilterGroups, "category", resource1);
        expect(result).toBeTruthy();
    });

    it("should match one group with one checkbox selected", () => {
        const categoryChoices: IFilterChoices = filterGroups.category.choices;
        categoryChoices.angular.checked = true;
        const reducedFilterGroups: IReducedFilterGroups = reduceFilterGroups(filterGroups);
        const resource1 = resources[ "articles/customizing/layout" ];
        const result = filterResourceGroup(reducedFilterGroups, "category", resource1);
        expect(result).toBeTruthy();
    });

    it("should match one group with two checkboxes selected", () => {
        const categoryChoices: IFilterChoices = filterGroups.category.choices;
        categoryChoices.angular.checked = true;
        categoryChoices.react.checked = true;
        const reducedFilterGroups: IReducedFilterGroups = reduceFilterGroups(filterGroups);
        const resource1 = resources[ "articles/customizing/layout" ];
        const result = filterResourceGroup(reducedFilterGroups, "category", resource1);
        expect(result).toBeTruthy();
    });

    it("should match one group with one checkbox on and one off", () => {
        const categoryChoices: IFilterChoices = filterGroups.category.choices;
        categoryChoices.angular.checked = true;
        categoryChoices.react.checked = false;
        const reducedFilterGroups: IReducedFilterGroups = reduceFilterGroups(filterGroups);
        const resource1 = resources[ "articles/customizing/layout" ];
        const result = filterResourceGroup(reducedFilterGroups, "category", resource1);
        expect(result).toBeTruthy();
    });

    it("should match one group with one checkbox off", () => {
        const categoryChoices: IFilterChoices = filterGroups.category.choices;
        categoryChoices.react.checked = false;
        const reducedFilterGroups: IReducedFilterGroups = reduceFilterGroups(filterGroups);
        const resource1 = resources[ "articles/customizing/layout" ];
        const result = filterResourceGroup(reducedFilterGroups, "category", resource1);
        expect(result).toBeTruthy();
    });

    it("should not match resource with checkbox on non-matching category", () => {
        const categoryChoices: IFilterChoices = filterGroups.category.choices;
        categoryChoices.angular.checked = true;  // Resource doesn't ref angular
        const reducedFilterGroups: IReducedFilterGroups = reduceFilterGroups(filterGroups);
        const resource1 = resources[ "articles/customizing/resources" ];
        const result = filterResourceGroup(reducedFilterGroups, "category", resource1);
        expect(result).toBeFalsy();
    });

});

describe("Select Resources All Filter Groups", () => {
    let resources: IResources = {};
    let filterGroups: IFilterGroups = {};

    beforeEach(() => {
        resources = setResources(dbResources, dbReferences, "xxx");
        filterGroups = setFilterGroups(dbReferences, resources, undefined);
    });

    it("should match resource when no groups are checked", () => {
        const reducedFilterGroups: IReducedFilterGroups = reduceFilterGroups(filterGroups);
        const resource1 = resources[ "articles/customizing/layout" ];
        const result = filterResourceGroups(reducedFilterGroups, resource1);
        expect(result).toBeTruthy();
    });

    it("should match resource when good check", () => {
        const categoryChoices: IFilterChoices = filterGroups.category.choices;
        categoryChoices.angular.checked = true;
        categoryChoices.react.checked = false;
        const reducedFilterGroups: IReducedFilterGroups = reduceFilterGroups(filterGroups);
        const resource1 = resources[ "articles/customizing/layout" ];
        const result = filterResourceGroups(reducedFilterGroups, resource1);
        expect(result).toBeTruthy();
    });

    it("should not match resource when bad check", () => {
        const categoryChoices: IFilterChoices = filterGroups.category.choices;
        categoryChoices.angular.checked = true;
        const reducedFilterGroups: IReducedFilterGroups = reduceFilterGroups(filterGroups);
        const resource1 = resources[ "articles/customizing/resources" ];
        const result = filterResourceGroups(reducedFilterGroups, resource1);
        expect(result).toBeFalsy();
    });

    it("should match resource when one good, another good check", () => {
        const resource1 = resources[ "articles/customizing/resources" ];

        // Select a checkbox matching this resource's author
        const authorChoices: IFilterChoices = filterGroups.author.choices;
        authorChoices.pauleveritt.checked = true;

        // But select a category not matching this resource's categories
        const categoryChoices: IFilterChoices = filterGroups.category.choices;
        categoryChoices.react.checked = true;

        const reducedFilterGroups: IReducedFilterGroups = reduceFilterGroups(filterGroups);
        const result = filterResourceGroups(reducedFilterGroups, resource1);
        expect(result).toBeTruthy();
    });

    it("should not match resource when one good, one bad check", () => {
        const resource1 = resources[ "articles/customizing/resources" ];

        // Select a checkbox matching this resource's author
        const authorChoices: IFilterChoices = filterGroups.author.choices;
        authorChoices.pauleveritt.checked = true;

        // But select a category not matching this resource's categories
        const categoryChoices: IFilterChoices = filterGroups.category.choices;
        categoryChoices.angular.checked = true;

        const reducedFilterGroups: IReducedFilterGroups = reduceFilterGroups(filterGroups);
        const results = filterResourceGroups(reducedFilterGroups, resource1);
        expect(results).toBeFalsy();
    });
});
