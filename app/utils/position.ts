export const getYFromIndex = (index: number) => Math.floor(index / 4);
export const getXFromIndex = (index: number) => index % 4;
export const getIndexFromXY = (x: number, y: number) => x + y * 4;
