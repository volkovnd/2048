import type { Item } from "@/types";

const moveEmptyItems = (items: Item[]) => {
  return items.sort((a, b) => (a.value === null ? 1 : 0) - (b.value === null ? 1 : 0));
};

export const moveItemsLeft = (items: Item[], cb?: (value: number) => void) => {
  const row = clone(items);

  moveEmptyItems(row);
  ``;
  for (let i = 0; i < row.length - 1; i++) {
    const current = row[i].value;
    const next = row[i + 1].value;

    if (current !== null && current === next) {
      row[i].value = current * 2;
      row[i + 1].value = null;

      if (cb) cb(current);
    }
  }

  moveEmptyItems(row);

  return row;
};

export const moveItemsRight = (items: Item[], cb?: (value: number) => void) => {
  return moveItemsLeft(clone(items).reverse(), cb).reverse();
};
