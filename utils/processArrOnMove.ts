import { createArr } from "./createArr";
import type { Item, ItemDashboard, ItemRow } from "@/types";

export const processArrOnMoveLeft = (dashboard: ItemDashboard, cb?: (value: number) => void) => {
  return dashboard.map((row: ItemRow) => {
    const newRow = clone(row).filter((input) => input !== null);

    for (let i = 0; i < newRow.length - 1; i++) {
      const current = newRow[i];
      const next = newRow[i + 1];

      if (current === next) {
        newRow.splice(i, 2, current * 2);

        if (cb) cb(newRow[i]);
      }
    }

    return ([] as Item[]).concat(newRow, createArr(4 - newRow.length, null));
  });
};

export const processArrOnMoveRight = (dashboard: ItemDashboard, cb?: (value: number) => void) => {
  return processArrOnMoveLeft(
    clone(dashboard).map((row) => row.reverse()),
    cb
  ).map((row) => row.reverse());
};
