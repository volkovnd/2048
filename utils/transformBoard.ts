import type { ItemDashboard } from "~/types";

export const transformRowsToColumns = (items: ItemDashboard) => {
  return Array.from({ length: 4 }, (_v, x) => Array.from({ length: 4 }, (_v, y) => items[y][x]));
};

export const transformColumnsToRows = (items: ItemDashboard) => {
  return Array.from({ length: 4 }, (_v, y) => Array.from({ length: 4 }, (_v, x) => items[x][y]));
};
