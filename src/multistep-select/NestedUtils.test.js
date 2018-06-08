import NestedUtils from "./NestedUtils";
import _ from "lodash";

const data = [
  { id: 1, name: "delivery", parentId: 0, children: [] },
  { id: 2, name: "another competency", parentId: 0, children: [3] },
  { id: 3, name: "child competency", parentId: 2, children: [4] },
  { id: 4, name: "child-child competency", parentId: 3, children: [] }
];

const nestedUtils = new NestedUtils(data);

describe("MultistepSelect", () => {
  describe("NestedUtils - Set of utilities for nested structures.", () => {
    it("should recursively find parent of specific item and order them from parents to children", () => {
      // the hardcoded ids are taken from ./dataStub.js

      let expected, actual;

      expect(nestedUtils.orderFromParentsToChildren(4).length).toEqual(3);

      expect(nestedUtils.orderFromParentsToChildren(1).length).toEqual(1);

      expected = [
        { id: 2, name: "another competency", parentId: 0, children: [3] },
        { id: 3, name: "child competency", parentId: 2, children: [4] },
        { id: 4, name: "child-child competency", parentId: 3, children: [] }
      ];

      nestedUtils.data = _.shuffle(data);
      actual = nestedUtils.orderFromParentsToChildren(4);

      expect(actual).toEqual(expected);
    });

    it("should get child items of some item", () => {
      nestedUtils.data = [
        { id: 1, name: "foo" },
        { id: 2, name: "bar", children: [3] },
        { id: 3, name: "baz" }
      ];

      const expected = [{ id: 3, name: "baz" }];

      expect(nestedUtils.getChildren(2)).toEqual(expected);
    });

    it("should get items of the same parent for specific item including that item", () => {
      nestedUtils.data = [
        { id: 1, name: "foo" },
        { id: 2, name: "bar", parentId: 1 },
        { id: 3, name: "baz", parentId: 1 },
        { id: 4, name: "a" },
        { id: 5, name: "b", parentId: 4 },
        { id: 6, name: "bazz", parentId: 1 }
      ];

      let expected = [
        { id: 2, name: "bar", parentId: 1 },
        { id: 3, name: "baz", parentId: 1 },
        { id: 6, name: "bazz", parentId: 1 }
      ];

      expect(nestedUtils.getNeighbours(2)).toEqual(expected);
    });

    it("should get items of the same parent for specific item excluding that item", () => {
      nestedUtils.data = [
        { id: 1, name: "foo" },
        { id: 2, name: "bar", parentId: 1 },
        { id: 3, name: "baz", parentId: 1 },
        { id: 4, name: "a" },
        { id: 5, name: "b", parentId: 4 },
        { id: 6, name: "bazz", parentId: 1 }
      ];

      let expected = [
        { id: 3, name: "baz", parentId: 1 },
        { id: 6, name: "bazz", parentId: 1 }
      ];

      expect(nestedUtils.getNeighbours(2, false)).toEqual(expected);
    });

    it("should get empty array if no neighbours found", () => {
      nestedUtils.data = [{ id: 1, name: "foo" }];

      expect(nestedUtils.getNeighbours(1)).toEqual([]);
      expect(nestedUtils.getNeighbours(2)).toEqual([]);
    });

    it("should get a list of labels for all items", () => {
      nestedUtils.data = [
        { id: 1, name: "foo" },
        { id: 2, name: "bar" },
        { id: 3, name: "baz" }
      ];

      expect(nestedUtils.getLabels()).toEqual(["foo", "bar", "baz"]);
    });

    it("should get a list of labels for specific items", () => {
      nestedUtils.data = [
        { id: 1, name: "foo" },
        { id: 2, name: "bar" },
        { id: 3, name: "baz" }
      ];

      expect(nestedUtils.getLabels([1, 3])).toEqual(["foo", "baz"]);
    });

    it("should get the list of root items", () => {
      nestedUtils.data = [
        { id: 1, name: "foo", parentId: 0 },
        { id: 2, name: "bar", parentId: 0 },
        { id: 3, name: "baz", parentId: 2 }
      ];

      expect(nestedUtils.getRootItems()).toEqual([
        { id: 1, name: "foo", parentId: 0 },
        { id: 2, name: "bar", parentId: 0 }
      ]);
    });

    it("should get the list of root items considering min parentId in the structure", () => {
      nestedUtils.data = [
        { id: 1, name: "foo", parentId: 1 },
        { id: 2, name: "bar", parentId: 1 },
        { id: 3, name: "baz", parentId: 2 }
      ];

      expect(nestedUtils.getRootItems()).toEqual([
        { id: 1, name: "foo", parentId: 1 },
        { id: 2, name: "bar", parentId: 1 }
      ]);
    });
  });
});
