export const createArr = <T>(size: number, value: T): T[] => {
  return Array.from({ length: size }, () => value);
};
