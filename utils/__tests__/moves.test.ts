import { describe, expect, it } from "vitest";
import { moveItemsLeft } from "../moves";

describe("moveItemsLeft", () => {
  it("test arr", () => {
    const input = [null, 2, null, 2].map((value) => ({ id: 2, value }));

    expect(moveItemsLeft(input).map((item) => item.value)).toEqual([4, null, null, null]);
  });

  it("test 2 arr", () => {
    const input = [2, 2, 2, 2].map((value) => ({ id: 2, value }));

    expect(moveItemsLeft(input).map((item) => item.value)).toEqual([4, 4, null, null]);
  });

  it("test 3 arr", () => {
    const input = [4, 2, 2, null].map((value) => ({ id: 2, value }));

    expect(moveItemsLeft(input).map((item) => item.value)).toEqual([4, 4, null, null]);
  });
});
