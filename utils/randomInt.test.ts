import { describe, expect, it } from "vitest";
import { randomInt } from "./randomInt";

describe("randomInt", () => {
  it("random number", () => {
    const min = 0;
    const max = 10;

    for (let i = 0; i < 100; i++) {
      const result = randomInt(max, min);

      expect(result).toBeLessThanOrEqual(max);
      expect(result).toBeGreaterThanOrEqual(min);
    }
  });
});
