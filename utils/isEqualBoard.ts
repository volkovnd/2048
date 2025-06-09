import type { ItemDashboard } from "~/types";

/**
 * Compares two boards and returns true if they are equal.
 * @param input1 - First board to compare.
 * @param input2 - Second board to compare.
 * @returns True if the boards are equal, false otherwise.
 */
export const isEqualBoard = (input1: ItemDashboard, input2: ItemDashboard): boolean => {
  if (input1.length !== input2.length) {
    return false;
  }

  for (let i = 0; i < input1.length; i++) {
    if (input1[i].value !== input2[i].value) {
      return false;
    }
  }
  return true;
};
