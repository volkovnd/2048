/**
 * Deep-clone a value using JSON.stringify/parse.
 *
 * @remarks
 *
 * This implementation is not suitable for all types of values, such as those
 * containing undefined, functions, or non-enumerable properties.
 *
 * @param input - The value to clone.
 * @returns A new value that is a deep clone of the input.
 */
export const clone = <T>(input: T) => {
  return JSON.parse(JSON.stringify(input)) as T;
};
