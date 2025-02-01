import type { ItemDashboard, ItemRow } from "@/types";

export const processArrOnMoveLeft = (dashboard: ItemDashboard, cb?: (value: number) => void) => {
  return dashboard.map((row: ItemRow) => {
    const newRow = clone(row);

    newRow.sort((a, b) => (a === null ? 1 : 0) - (b === null ? 1 : 0));

    for (let i = 0; i < newRow.length - 1; i++) {
      const current = newRow[i];
      const next = newRow[i + 1];

      if (current !== null && current === next) {
        newRow[i] = null;
        newRow[i + 1] = current * 2;

        if (cb) cb(current);
      }
    }

    newRow.sort((a, b) => (a === null ? 1 : 0) - (b === null ? 1 : 0));

    return newRow;
  });
};

export const processArrOnMoveRight = (dashboard: ItemDashboard, cb?: (value: number) => void) => {
  return processArrOnMoveLeft(
    clone(dashboard).map((row) => row.reverse()),
    cb
  ).map((row) => row.reverse());
};
