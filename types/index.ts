export type ItemValue = number | null;
export type ItemPosition = {
  x: number;
  y: number;
};
export type Item = {
  id: number;
  value: ItemValue;
};
export type ItemRow = Item[];
export type ItemColumn = Item[];
export type ItemDashboard = Item[];
