import type { Item, ItemDashboard, ItemRow } from "@/types";

export const processArrOnMove = (input: ItemRow, right: boolean = false) => {
  const removeSpaces = <T>(input: Array<T>): Array<T> => {
    return input.filter((input) => input !== null);
  };

  let newRow: ItemRow = removeSpaces(clone(input));

  if (right) {
    newRow.reverse();
  }

  for (let i = 0; i < newRow.length - 1; i++) {
    if (newRow[i] !== null && newRow[i] === newRow[i + 1]) {
      newRow[i + 1] = null;
      // @ts-ignore
      newRow[i] = newRow[i] * 2;
    }
  }

  newRow = removeSpaces(newRow);

  newRow = newRow.concat(Array(4 - newRow.length).fill(null));

  if (right) {
    newRow.reverse();
  }

  return newRow;
};
