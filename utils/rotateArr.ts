import type { ItemDashboard } from "~/types";

// Возвращает новый массив, в котором значения развернуты на 90 градусов
// [ [1,2], [1,2] ] => [ [1,1], [2,2] ]
export const rotateArr = (input: ItemDashboard) => {
  return Array.from({ length: 4 }, (_v, y) => Array.from({ length: 4 }, (_v, x) => input[x][y]));
};
