export type ItemValue = number | null;
export type ItemPosition = {
  x: number;
  y: number;
};
export type Item = {
  id: number;
  value: ItemValue;
  position?: ItemPosition;
};

export type ItemRow =  Item[];
export type ItemColumn = Item[];
export type ItemDashboard = Item[];

export type HistoryItem = {
  items: ItemDashboard;
  score: number;
};

export type History = HistoryItem[];
