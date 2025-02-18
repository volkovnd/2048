import type { ItemColumn, ItemDashboard, ItemRow } from "~/types";

export const transformDashboardToColumns = (items: ItemDashboard) => {
  return Array.from({ length: 4 }, (_v, x) =>
    Array.from({ length: 4 }, (_v, y) => items[getIndexFromXY(x, y)])
  );
};

export const transformDashboardToRows = (items: ItemDashboard) => {
  return Array.from({ length: 4 }, (_v, y) =>
    Array.from({ length: 4 }, (_v, x) => items[getIndexFromXY(x, y)])
  );
};

export const transformColumnsToDashboard = (columns: ItemColumn[]) => {
  return Array.from({ length: 16 }, (_, i) => columns[i % 4][Math.floor(i / 4)]);
};

export const transformRowsToDashboard = (rows: ItemRow[]) => {
  return Array.from({ length: 16 }, (_, i) => rows[Math.floor(i / 4)][i % 4]);
};

export const mapRows = (items: ItemDashboard, fn: (item: ItemRow) => ItemRow) => {
  return transformRowsToDashboard(transformDashboardToRows(items).map((row) => fn(row)));
};

export const mapColumns = (items: ItemDashboard, fn: (item: ItemColumn) => ItemColumn) => {
  return transformColumnsToDashboard(
    transformDashboardToColumns(items).map((column) => fn(column))
  );
};
