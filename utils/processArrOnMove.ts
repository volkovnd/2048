import type { Item } from "@/types";

export const processArrOnMoveLeft = (input: Item[]) => {
  const removeSpaces = (input: Array<Item>): Array<Item> => {
    return input.filter((input) => input !== null);
  };

  let newRow = removeSpaces(input);

  for (let i = 0; i < newRow.length; i++) {
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

export const processArrOnMoveRight = (input: Item[]) => {
  return processArrOnMoveLeft(input.reverse()).reverse();
};
