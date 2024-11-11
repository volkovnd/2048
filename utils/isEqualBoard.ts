import type { ItemDashboard } from "~/types";

export const isEqualBoard = (input1: ItemDashboard, input2: ItemDashboard): boolean => {
  return JSON.stringify(input1) === JSON.stringify(input2);
};
