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

onKeyStroke("ArrowUp", () => {
  const oldArray = clone(items.value);

  for (let i = 0; i < 4; i++) {
    let newRow: ItemRow = [];

    items.value.forEach((row) => {
      newRow.push(row[i]);
    });

    newRow = processArrOnMoveLeft(newRow);

    for (let j = 0; j < items.value.length; j++) {
      items.value[j][i] = newRow[j];
    }
  }

  if (!isEqual(oldArray, items.value)) {
    addRandomItem();
  }
});

onKeyStroke("ArrowDown", () => {
  const oldArray = clone(items.value);

  for (let i = 0; i < 4; i++) {
    let newRow: ItemRow = [];

    items.value.forEach((row, index) => {
      newRow.push(row[i]);
    });

    newRow = processArrOnMoveLeft(newRow.reverse()).reverse();

    for (let j = 0; j < items.value.length; j++) {
      items.value[j][i] = newRow[j];
    }
  }

  if (!isEqual(oldArray, items.value)) {
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
