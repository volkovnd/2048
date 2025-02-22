import type { Item } from "@/types";

const moveEmptyItems = (items: Item[]) => {
  const notEmptyItems = items.filter((item) => item.value !== null);

  return notEmptyItems.concat(Array.from({ length: 4 - notEmptyItems.length }, () => createItem()));
};

export const moveItemsLeft = (items: Item[], cb?: (value: number) => void) => {
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

export const moveItemsRight = (items: Item[], cb?: (value: number) => void) => {
  return moveItemsLeft(clone(items).reverse(), cb).reverse();
};
