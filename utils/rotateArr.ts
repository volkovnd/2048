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
export const rotateArrRight = (input: ItemDashboard) => {
  const result = Array.from({ length: input.length }, (_v, y) =>
    Array.from({ length: input[0].length }, (_v, x) => input[3 - x][y])
  );

  return result;
};

/**
 * Rotates a 2D array 90 degrees clockwise.
 *
 * @param {ItemDashboard} input - The 2D array to be rotated.
 * @returns {ItemDashboard} The rotated 2D array.
 */
export const rotateArrLeft = (input: ItemDashboard) => {
  const result = Array.from({ length: input.length }, (_v, y) =>
    Array.from({ length: input[0].length }, (_v, x) => input[x][3 - y])
  );

  return result;
};

export const flipArrVertically = (input: ItemDashboard) => {
  const result = Array.from({ length: input.length }, (_v, y) =>
    Array.from({ length: input[0].length }, (_v, x) => input[3 - y][x])
  );

  return result;
};

export const flipArrHorizontally = (input: ItemDashboard) => {
  const result = Array.from({ length: input.length }, (_v, y) =>
    Array.from({ length: input[0].length }, (_v, x) => input[y][3 - x])
  );

  return result;
};
