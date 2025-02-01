import type { Item } from "@/types";

const moveEmptyItems = (items: Item[], left = true) => {
  return items.sort(
    (a, b) => (a === null ? (left ? 1 : -1) : 0) - (b === null ? (left ? 1 : -1) : 0)
  );
};

export const processArrOnMoveLeft = (items: Item[], cb?: (value: number) => void) => {
  const row = clone(items);

  moveEmptyItems(row);

  for (let i = 0; i < row.length - 1; i++) {
    const current = row[i];
    const next = row[i + 1];

    if (current !== null && current === next) {
      row[i] = null;
      row[i + 1] = current * 2;

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
    const current = row[i];
    const next = row[i - 1];

    if (current !== null && current === next) {
      row[i] = null;
      row[i - 1] = current * 2;

      if (cb) cb(current);
    }
  }

  moveEmptyItems(row, false);

  return row;
};
