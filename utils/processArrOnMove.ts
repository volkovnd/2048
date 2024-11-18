import { createArr } from "./createArr";
import type { Item } from "@/types";

export const processArrOnMoveLeft = (input: Item[]) => {
  const newRow = clone(input).filter((input) => input !== null);

  for (let i = 0; i < newRow.length - 1; i++) {
    const current = newRow[i];
    const next = newRow[i + 1];

    if (current === next) {
      newRow[i] = current * 2;

      newRow.splice(i + 1, 1);
    }
  }

  return ([] as Item[]).concat(newRow, createArr(4 - newRow.length, null));
};

export const processArrOnMoveRight = (input: Item[]) => {
  return processArrOnMoveLeft(clone(input).reverse()).reverse();
};
