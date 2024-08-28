import { describe, expect, it } from "vitest";
import { processArrOnMove } from "./processArrOnMove";

describe("processArrOnMove", () => {
  it("test arr", () => {
    const input = [null, 2, null, 2];

    expect(processArrOnMove(input)).toEqual([4, null, null, null]);
  });

  it("test 2 arr", () => {
    const input = [2, 2, 2, 2];

    expect(processArrOnMove(input)).toEqual([4, 4, null, null]);
  });

  it("test 3 arr", () => {
    const input = [4, 2, 2, null];

    expect(processArrOnMove(input)).toEqual([4, 4, null, null]);
  });
});
