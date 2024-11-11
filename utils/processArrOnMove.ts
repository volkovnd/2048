import type { Item } from "@/types";

export const processArrOnMoveLeft = (input: Item[]) => {
  const newRow = clone(input).filter((input) => input !== null);

  for (let i = 0; i < newRow.length - 1; i++) {
    const current = newRow[i] as number;
    const next = newRow[i + 1] as number;

    if (current === next) {
      newRow[i] = current * 2;

      newRow.splice(i + 1, 1);
    }
  }

  return newRow.concat(Array(4 - newRow.length).fill(null));
};

export const processArrOnMoveRight = (input: Item[]) => {
  return processArrOnMoveLeft(clone(input).reverse()).reverse();
};
