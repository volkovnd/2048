import type { ItemDashboard } from "~/types";

/**
 * Compares two boards and returns true if they are equal.
 * @param input1 - First board to compare.
 * @param input2 - Second board to compare.
 * @returns True if the boards are equal, false otherwise.
 */
export const isEqualBoard = (input1: ItemDashboard, input2: ItemDashboard): boolean => {
  const getOnlyValues = (input: ItemDashboard) => {
    return input.map((item) => item.value);
  };

  return JSON.stringify(getOnlyValues(input1)) === JSON.stringify(getOnlyValues(input2));
};
