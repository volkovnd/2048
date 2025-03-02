import type { Item, ItemValue } from "~/types";

let _id = 0;

export const createItem = (value: ItemValue = null): Item => ({
  id: _id++,
  value
});

export const setCreateItemId = (id: number) => (_id = id);
