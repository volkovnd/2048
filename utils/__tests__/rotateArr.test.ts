import { describe, expect, it } from "vitest";
import {
  rotateArrRight,
  rotateArrLeft,
  flipArrHorizontally,
  flipArrVertically
} from "../rotateArr";

describe("rotateArr", () => {
  it("rotateArrRight", () => {
    const input = [
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4]
    ];

    expect(rotateArrRight(input)).toEqual([
      [1, 1, 1, 1],
      [2, 2, 2, 2],
      [3, 3, 3, 3],
      [4, 4, 4, 4]
    ]);
    expect(rotateArrRight(rotateArrRight(input))).toEqual([
      [4, 3, 2, 1],
      [4, 3, 2, 1],
      [4, 3, 2, 1],
      [4, 3, 2, 1]
    ]);
  });

  it("rotateArrLeft", () => {
    const input = [
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4]
    ];

    expect(rotateArrLeft(input)).toEqual([
      [4, 4, 4, 4],
      [3, 3, 3, 3],
      [2, 2, 2, 2],
      [1, 1, 1, 1]
    ]);
    expect(rotateArrLeft(rotateArrLeft(input))).toEqual([
      [4, 3, 2, 1],
      [4, 3, 2, 1],
      [4, 3, 2, 1],
      [4, 3, 2, 1]
    ]);
  });

  it("flipArrHorizontally", () => {
    const input = [
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [1, 2, 3, 4]
    ];

    expect(flipArrHorizontally(input)).toEqual([
      [4, 3, 2, 1],
      [4, 3, 2, 1],
      [4, 3, 2, 1],
      [4, 3, 2, 1]
    ]);
  });

  it("flipArrVertically", () => {
    const input = [
      [1, 1, 1, 1],
      [2, 2, 2, 2],
      [3, 3, 3, 3],
      [4, 4, 4, 4]
    ];

    expect(flipArrVertically(input)).toEqual([
      [4, 4, 4, 4],
      [3, 3, 3, 3],
      [2, 2, 2, 2],
      [1, 1, 1, 1]
    ]);
  });
});
