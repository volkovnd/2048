import { describe, expect, it } from "vitest";
import { processArrOnMoveLeft } from "./processArrOnMoveLeft";

describe("processArrOnMoveLeft", () => {
  it("test arr", () => {
    const input = [null, 2, null, 2];

    expect(processArrOnMoveLeft(input)).toEqual([4, null, null, null]);
  });

  it("test 2 arr", () => {
    const input = [2, 2, 2, 2];

    expect(processArrOnMoveLeft(input)).toEqual([4, 4, null, null]);
  });

  it("test 3 arr", () => {
    const input = [4, 2, 2, null];

    expect(processArrOnMoveLeft(input)).toEqual([4, 4, null, null]);
  });
});
