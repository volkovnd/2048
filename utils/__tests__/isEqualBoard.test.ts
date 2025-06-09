import { describe, expect, it } from "vitest";
import type { ItemDashboard, ItemValue } from "~/types";

const createItemFromValue = (rows: ItemValue[][]): ItemDashboard =>
  rows.flat().map((value) => ({ id: 2, value }));

describe("isEqualArrs", () => {
  it("array of array equal", () => {
    const arr1 = createItemFromValue([
      [1, 2],
      [3, 4]
    ]);
    const arr2 = createItemFromValue([
      [1, 2],
      [3, 4]
    ]);

    expect(isEqualBoard(arr1, arr2)).toBeTruthy();
  });

  it("array of array not equal", () => {
    const arr1 = createItemFromValue([
      [1, 2],
      [3, 4]
    ]);
    const arr2 = createItemFromValue([
      [3, 4],
      [1, 2]
    ]);

    expect(isEqualBoard(arr1, arr2)).toBeFalsy();
  });

  it("arrays with not identical structure", () => {
    const arr1 = createItemFromValue([
      [1, 2],
      [3, 4]
    ]);
    const arr2 = createItemFromValue([
      [3, 4],
      [1, 2]
    ]);

    expect(isEqualBoard(arr1, arr2)).toBeFalsy();
  });
});
