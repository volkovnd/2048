import { describe, expect, it } from "vitest";
import { isEqualBoard } from "../isEqualBoard";

describe("isEqualArrs", () => {
  it("primitive equal arrs", () => {
    const arr1 = [
      [1, 2],
      [3, 4]
    ];
    const arr2 = [
      [1, 2],
      [3, 4]
    ];

    expect(isEqualBoard(arr1, arr2)).toBeTruthy();
  });

  it("primitive not equal arrs", () => {
    const arr1 = [[1, 2, 3, 4]];
    const arr2 = [[2, 3, 4]];

    expect(isEqualBoard(arr1, arr2)).toBeFalsy();
  });

  it("array of array equal", () => {
    const arr1 = [
      [1, 2],
      [3, 4]
    ];
    const arr2 = [
      [1, 2],
      [3, 4]
    ];

    expect(isEqualBoard(arr1, arr2)).toBeTruthy();
  });

  it("array of array not equal", () => {
    const arr1 = [
      [1, 2],
      [3, 4],
      [null, null]
    ];
    const arr2 = [
      [3, 4],
      [1, 2],
      [null, null]
    ];

    expect(isEqualBoard(arr1, arr2)).toBeFalsy();
  });

  it("arrays with not identical structure", () => {
    const arr1 = [[1, 2], [3]];
    const arr2 = [[3], [1, 2]];

    expect(isEqualBoard(arr1, arr2)).toBeFalsy();
  });
});
