import type { ItemDashboard } from "~/types";

/**
 * Rotate 2D array by 90 degrees clockwise.
 *
 * @example
 * [ [1,2], [1,2] ] => [ [1,1], [2,2] ]
 *
 * @param {ItemDashboard} input - 2D array to rotate
 * @returns {ItemDashboard} rotated 2D array
 */
export const rotateArr = (input: ItemDashboard) => {
  return Array.from({ length: 4 }, (_v, y) => Array.from({ length: 4 }, (_v, x) => input[x][y]));
};
