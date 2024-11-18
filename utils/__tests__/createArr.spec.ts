import { describe, expect, it } from "vitest";
import { createArr } from "../createArr";

describe("createArr", () => {
  it("create simple Arr", () => {
    const size = 4;
    const value = 2;

    expect(createArr(size, value)).toEqual([2, 2, 2, 2]);
  });

  it("create multi Arr", () => {
    const xSize = 4;
    const ySize = 4;
    const value = 2;

    expect(createArr(ySize, () => createArr(xSize, value))).toEqual([
      [2, 2, 2, 2],
      [2, 2, 2, 2],
      [2, 2, 2, 2],
      [2, 2, 2, 2]
    ]);
  });
});
