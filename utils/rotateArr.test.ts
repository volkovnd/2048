import { describe, expect, it } from "vitest";
import { rotateArr } from "./rotateArr";

describe("rotateArr", () => {
  it("rotateArr", () => {
    const input = [
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4],
    ];

    expect(rotateArr(input)).toEqual([
      [1, 1, 1, 1],
      [2, 2, 2, 2],
      [3, 3, 3, 3],
      [4, 4, 4, 4],
    ]);
  });
});
