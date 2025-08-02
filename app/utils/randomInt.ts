/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * If min is omitted, defaults to 0.
 * @param {number} max The upper bound
 * @param {number} [min=0] The lower bound
 */
export const randomInt = (max: number, min: number = 0) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
