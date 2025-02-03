import type { Item } from "@/types";

const moveEmptyItems = (items: Item[], left = true) => {
  const notEmpty = items.filter((item) => item.value !== null);

  const emptyItems = Array.from({ length: 4 - notEmpty.length }, () => createItem());

  return ([] as Item[]).concat(left ? [] : emptyItems, notEmpty, left ? emptyItems : []);
};

export const processArrOnMoveLeft = (items: Item[], cb?: (value: number) => void) => {
  let row = clone(items);

  row = moveEmptyItems(row);

  for (let i = 0; i < row.length - 1; i++) {
    const current = row[i].value;
    const next = row[i + 1].value;

    if (current !== null && current === next) {
      row[i].value = current * 2;
      row[i + 1].value = null;

      if (cb) cb(current);
    }
  }

  row = moveEmptyItems(row);

  return row;
};

export const processArrOnMoveRight = (items: Item[], cb?: (value: number) => void) => {
  return processArrOnMoveLeft(clone(items).reverse(), cb).reverse();
};
