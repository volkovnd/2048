<template>
  <div class="wrapper">
    <div class="board">
      <template v-for="(row, x) in items" :key="x">
        <div v-for="(item, y) in row" :key="y" class="board-item">
          {{ item }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ItemDashboard, ItemRow } from "@/types";

const items = ref<ItemDashboard>(Array.from({ length: 4 }, () => Array(4).fill(null)));

const addRandomItem = () => {
  const emptyItems = items.value.reduce<Array<{ x: number; y: number }>>((acc, row, y) => {
    row.forEach((item, x) => {
      if (item === null) {
        acc.push({ x, y });
      }
    });

    return acc;
  }, []);

  const randIndex = randomInt(emptyItems.length);

  items.value[emptyItems[randIndex].y][emptyItems[randIndex].x] = 2;
};

onMounted(() => {
  addRandomItem();
});

onKeyStroke("ArrowLeft", () => {
  const itemsCopy = clone(items.value).map((row, index) => {
    return processArrOnMoveLeft(row);
  });

  if (!isEqual(itemsCopy, items.value)) {
    items.value = itemsCopy;

    addRandomItem();
  }
});

onKeyStroke("ArrowRight", () => {
  const itemsCopy = clone(items.value).map((row, index) => {
    return processArrOnMoveLeft(row.reverse()).reverse();
  });

  if (!isEqual(itemsCopy, items.value)) {
    items.value = itemsCopy;

    addRandomItem();
  }
});

const rotateArr = (input: ItemDashboard) => {
  return Array.from({ length: 4 }, (_v, y) => Array.from({ length: 4 }, (_v, x) => input[x][y]));
};

onKeyStroke("ArrowUp", () => {
  const result = rotateArr(rotateArr(items.value).map((row) => processArrOnMoveLeft(row)));

  if (!isEqual(items.value, result)) {
    items.value = result;

    addRandomItem();
  }
});

onKeyStroke("ArrowDown", () => {
  const result = rotateArr(rotateArr(items.value).map((row) => processArrOnMoveLeft(row.reverse()).reverse()));

  if (!isEqual(result, items.value)) {
    items.value = result;

    addRandomItem();
  }
});
</script>

<style>
@import "normalize.css/normalize.css";

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}

.board {
  width: 800px;
  height: 800px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 10px;
}

.board-item {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: bold;
  background-color: #f0f0f0;
}
</style>
