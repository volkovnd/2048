export const createArr = <T = number | null>(size: number, value: T | (() => T)): T[] => {
  const isCb = (input: T | (() => T)): input is () => T => typeof input === "function";

  return Array.from({ length: size }, isCb(value) ? () => value() : () => value);
};
