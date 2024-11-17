import type { ItemDashboard } from "~/types";

/**
 * Compares two boards and returns true if they are equal.
 * @param input1 - First board to compare.
 * @param input2 - Second board to compare.
 * @returns True if the boards are equal, false otherwise.
 */
export const isEqualBoard = (input1: ItemDashboard, input2: ItemDashboard): boolean => {
  return JSON.stringify(input1) === JSON.stringify(input2);
};
