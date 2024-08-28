import type { Item, ItemDashboard, ItemRow } from "@/types";

export const processArrOnMoveLeft = (input: ItemRow) => {
  const removeSpaces = <T>(input: Array<T>): Array<T> => {
    return input.filter((input) => input !== null);
  };

  let newRow: ItemRow = removeSpaces(input);

  for (let i = 0; i < newRow.length - 1; i++) {
    if (newRow[i] !== null && newRow[i] === newRow[i + 1]) {
      newRow[i + 1] = null;
      // @ts-ignore
      newRow[i] = newRow[i] * 2;
    }
  }

  newRow = removeSpaces(newRow);

  newRow = newRow.concat(Array(4 - newRow.length).fill(null));

  return newRow;
};
