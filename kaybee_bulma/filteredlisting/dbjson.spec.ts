import {
    filterResourceGroup, filterResourceGroups, filterResources, IReducedFilterGroups, sampleReferences,
    sampleResources, setFilterGroups, setResources
} from "./dbjson";
import { reduceFilterGroups } from "./dbjson";
import { IFilterChoices, IFilterGroups, IResource, IResources } from "./State";

describe("Reduce Filter Groups", () => {
    let resources: IResources = {};
    let filterGroups: IFilterGroups = {};

    beforeEach(() => {
        resources = setResources(sampleResources, sampleReferences, "xxx");
        filterGroups = setFilterGroups(sampleReferences, resources, undefined);
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
        resources = setResources(sampleResources, sampleReferences, "xxx");
        filterGroups = setFilterGroups(sampleReferences, resources, undefined);
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

    it("should match one group with one RTYPE selected", () => {
        const categoryChoices: IFilterChoices = filterGroups.rtype.choices;
        categoryChoices.article.checked = true;
        const reducedFilterGroups: IReducedFilterGroups = reduceFilterGroups(filterGroups);
        const resource1 = resources[ "articles/customizing/layout" ];
        const result = filterResourceGroup(reducedFilterGroups, "rtype", resource1);
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

    it("should match one group with two selected", () => {
        const categoryChoices: IFilterChoices = filterGroups.category.choices;
        categoryChoices.angular.checked = true;
        categoryChoices.react.checked = true;
        const reducedFilterGroups: IReducedFilterGroups = reduceFilterGroups(filterGroups);
        const resource1 = resources[ "articles/customizing/layout" ];
        const result = filterResourceGroup(reducedFilterGroups, "category", resource1);
        expect(result).toBeTruthy();
    });

    it("should not match one group with two wrong checkboxes", () => {
        // Select two checkboxes that do NOT match the resources's references
        const categoryChoices: IFilterChoices = filterGroups.category.choices;
        categoryChoices.angular.checked = false;
        categoryChoices.react.checked = true;
        categoryChoices.typescript.checked = false;
        const reducedFilterGroups: IReducedFilterGroups = reduceFilterGroups(filterGroups);
        const resource1 = resources[ "articles/customizing/layout" ];
        const result = filterResourceGroup(reducedFilterGroups, "category", resource1);
        expect(result).toBeFalsy();
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
        resources = setResources(sampleResources, sampleReferences, "xxx");
        filterGroups = setFilterGroups(sampleReferences, resources, undefined);
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

    it("should match resource when good rtype check", () => {
        const rtypeChoices: IFilterChoices = filterGroups.rtype.choices;
        rtypeChoices.article.checked = true;
        rtypeChoices.homepage.checked = false;
        const reducedFilterGroups: IReducedFilterGroups = reduceFilterGroups(filterGroups);
        const resource1 = resources[ "articles/customizing/layout" ];
        const result = filterResourceGroups(reducedFilterGroups, resource1);
        expect(result).toBeTruthy();
    });

    it("should not match resource when bad rtype check", () => {
        const rtypeChoices: IFilterChoices = filterGroups.rtype.choices;
        rtypeChoices.article.checked = false;
        rtypeChoices.homepage.checked = true;
        const reducedFilterGroups: IReducedFilterGroups = reduceFilterGroups(filterGroups);
        const resource1 = resources[ "articles/customizing/layout" ];
        const result = filterResourceGroups(reducedFilterGroups, resource1);
        expect(result).toBeFalsy();
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

describe("Filter All Resources Into Results", () => {
    // This is the top-level one called from actions

    let resources: IResources = {};
    let filterGroups: IFilterGroups = {};

    beforeEach(() => {
        resources = setResources(sampleResources, sampleReferences, "xxx");
        filterGroups = setFilterGroups(sampleReferences, resources, undefined);
    });

    it("should filter based on searchterm", () => {
        const reducedFilterGroups: IReducedFilterGroups = reduceFilterGroups(filterGroups);
        const filterTerm = "the";
        const results = filterResources(reducedFilterGroups, resources, filterTerm, "");
        expect(results.length).toEqual(9);
    });

    it("should not filter based on empty searchterm", () => {
        const reducedFilterGroups: IReducedFilterGroups = reduceFilterGroups(filterGroups);
        const filterTerm = "";
        const results = filterResources(reducedFilterGroups, resources, filterTerm, "");
        expect(results.length).toEqual(19);
    });

    it("should filter based on parent_docname", () => {
        const reducedFilterGroups: IReducedFilterGroups = reduceFilterGroups(filterGroups);
        const filterParent = "articles/index";
        const results = filterResources(reducedFilterGroups, resources, "", filterParent);
        expect(results.length).toEqual(6);
    });

    it("should not filter based on empty parent_docname", () => {
        const reducedFilterGroups: IReducedFilterGroups = reduceFilterGroups(filterGroups);
        const filterParent = "";
        const results = filterResources(reducedFilterGroups, resources, "", filterParent);
        expect(results.length).toEqual(19);
    });

    it("should filter resources with searchterm and filter groups", () => {
        // Select a category not matching this resource's categories
        const categoryChoices: IFilterChoices = filterGroups.category.choices;
        categoryChoices.angular.checked = true;

        const reducedFilterGroups: IReducedFilterGroups = reduceFilterGroups(filterGroups);
        const filterTerm = "";
        const results = filterResources(reducedFilterGroups, resources, filterTerm, "");
        expect(results.length).toEqual(3);
        results.map(
            resource => {
                const category = resource.props.references.category;
                expect(category.includes("angular")).toBeTruthy();
            }
        )
    });

    it("should filter resources with searchterm, fgs, parent", () => {
        // Select a category not matching this resource's categories
        const categoryChoices: IFilterChoices = filterGroups.category.choices;
        categoryChoices.angular.checked = true;

        const reducedFilterGroups: IReducedFilterGroups = reduceFilterGroups(filterGroups);
        const filterTerm = "layout";
        const filterParent = "articles/index";
        const results = filterResources(reducedFilterGroups, resources, filterTerm, filterParent);
        expect(results.length).toEqual(1);
        const category = results[0].props.references.category;
        expect(category.includes("angular")).toBeTruthy();
    });

});

describe("Set Resources", () => {
    let results: IResources = {};
    let resource: IResource;

    beforeEach(() => {
        results = setResources(sampleResources, sampleReferences, "xxx");
        resource = results[ "articles/customizing/resources" ];
    });

    it("should set a number of resources", () => {
        expect(Object.keys(results).length).toBe(19);
    });

    it("should set an href", () => {
        const href = "xxx/../articles/customizing/resources.html";
        expect(resource.href).toEqual(href);
    });

    it("should set a primary reference", () => {
        const primary_reference = resource.primary_reference;
        const docname = "categories/angular";
        if (primary_reference) {
            expect(primary_reference.docname).toEqual(docname);
        }
    });

    it("should set three references", () => {
        const refs = resource.references;
        expect(refs.length).toEqual(2);
        expect(refs[ 0 ].docname).toEqual("categories/react");
    });

    it("should set a primary reference", () => {
        const pr = resource.primary_reference;
        if (pr) {
            expect(pr.docname).toBe("categories/angular");
        }
    });

    it("should reformat props.published", () => {
        const published = resource.props.published;
        expect(published).toBe("Sun Oct 01 2017");
    });

    it("should set a primary author", () => {
        const pa = resource.author;
        const url = "xxx/../authors/pauleveritt/index.html/../paul_headshotx24.jpeg";
        if (pa) {
            expect(pa.docname).toBe("authors/pauleveritt/index");
            expect(pa.thumbnailUrl).toBe(url);
        }
    });

});

describe("Set Filter Groups", () => {
    let resources: IResources = {};
    let results: IFilterGroups = {};

    beforeEach(() => {
        resources = setResources(sampleResources, sampleReferences, "xxx");
        results = setFilterGroups(sampleReferences, resources, undefined);
    });

    it("should set basic filter groups", () => {
        expect(Object.keys(results)).toEqual([ "rtype", "category", "author" ]);
        expect(results.rtype.choices.article.count).toEqual(7);
        expect(results.author.choices.pauleveritt.count).toEqual(15);
        expect(results.category.choices.angular.count).toEqual(3);
    });
});
