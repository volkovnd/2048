import type { Item } from "@/types";

const moveEmptyItems = (items: Item[], left = true) => {
  return items.sort(
    (a, b) => (a.value === null ? (left ? 1 : -1) : 0) - (b.value === null ? (left ? 1 : -1) : 0)
  );
};

export const processArrOnMoveLeft = (items: Item[], cb?: (value: number) => void) => {
  const row = clone(items);

  moveEmptyItems(row);

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

export const processArrOnMoveRight = (items: Item[], cb?: (value: number) => void) => {
  const row = clone(items);

  moveEmptyItems(row, false);

  for (let i = row.length - 1; i > 1; i--) {
    const current = row[i].value;
    const next = row[i - 1].value;

    if (current !== null && current === next) {
      row[i].value = current * 2;
      row[i - 1].value = null;

      if (cb) cb(current);
    }
  }

  moveEmptyItems(row, false);

  return row;
};
