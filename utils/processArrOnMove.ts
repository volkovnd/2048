import type { ItemRow } from "@/types";

export const processArrOnMoveLeft = (input: ItemRow) => {
  const removeSpaces = <T>(input: Array<T>): Array<T> => {
    return input.filter((input) => input !== null);
  };

  let newRow: ItemRow = removeSpaces(clone(input));

  for (let i = 0; i < newRow.length - 1; i++) {
    const current = newRow[i];
    const next = newRow[i + 1];

    if (current !== null && current === next) {
      newRow[i] = current * 2;

      newRow[i + 1] = null;
    }
  }

  newRow = removeSpaces(newRow);

  newRow = newRow.concat(Array(4 - newRow.length).fill(null));

  return newRow;
};

export const processArrOnMoveRight = (input: ItemRow) => {
  return processArrOnMoveLeft(input.reverse()).reverse();
};
