import { describe, expect, it } from "vitest";
import { processArrOnMoveLeft } from "../processArrOnMove";

describe("processArrOnMoveLeft", () => {
  it("test arr", () => {
    const input = [null, 2, null, 2].map((value) => ({ id: 2, value }));

    expect(processArrOnMoveLeft(input)).toEqual(
      [4, null, null, null].map((value) => ({ id: 2, value }))
    );
  });

  it("test 2 arr", () => {
    const input = [2, 2, 2, 2].map((value) => ({ id: 2, value }));

    expect(processArrOnMoveLeft(input)).toEqual(
      [4, 4, null, null].map((value) => ({ id: 2, value }))
    );
  });

  it("test 3 arr", () => {
    const input = [4, 2, 2, null].map((value) => ({ id: 2, value }));

    expect(processArrOnMoveLeft(input)).toEqual(
      [4, 4, null, null].map((value) => ({ id: 2, value }))
    );
  });
});
