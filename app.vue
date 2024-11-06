<template>
  <h3
    v-if="isFinished"
    style="font-size: 40px; text-align: center"
  >
    Игра закончена!
  </h3>
  <div class="wrapper">
    <div class="board">
      <template
        v-for="(row, x) in items"
        :key="x"
      >
        <div
          v-for="(item, y) in row"
          :key="y"
          class="board-item"
        >
          {{ item }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ItemDashboard } from "@/types";

useHead({
  title: "2048"
});

const items = ref<ItemDashboard>(
  Array.from({ length: 4 }, () => Array(4).fill(null))
);

const addRandomItem = () => {
  const emptyItems = items.value.reduce<Array<{ x: number; y: number }>>(
    (acc, row, y) => {
      row.forEach((item, x) => {
        if (item === null) {
          acc.push({ x, y });
        }
      });

      return acc;
    },
    []
  );

  const randIndex = randomInt(emptyItems.length);

  items.value[emptyItems[randIndex].y][emptyItems[randIndex].x] = 2;
};

onMounted(() => {
  addRandomItem();
});

const isAllowedAction = (action: () => ItemDashboard) => {
  const result = action();

  return !isEqual(result, items.value);
};

const createOnKeyHandler = (createResultFn: () => ItemDashboard) => {
  return () => {
    const result = createResultFn();

    if (!isEqual(result, items.value)) {
      items.value = result;

      addRandomItem();
    }
  };
};

const onLeft = () => clone(items.value).map((row) => processArrOnMoveLeft(row));
const onRight = () =>
  clone(items.value).map((row) => processArrOnMoveRight(row));
const onUp = () =>
  rotateArr(rotateArr(items.value).map((row) => processArrOnMoveLeft(row)));
const onDown = () =>
  rotateArr(rotateArr(items.value).map((row) => processArrOnMoveRight(row)));

useKeyDown("ArrowLeft", createOnKeyHandler(onLeft));
useKeyDown("ArrowRight", createOnKeyHandler(onRight));
useKeyDown("ArrowUp", createOnKeyHandler(onUp));
useKeyDown("ArrowDown", createOnKeyHandler(onDown));

const isFinished = ref(false);

watch(items, () => {
  isFinished.value = [onLeft, onRight, onUp, onDown].every(
    (fn) => !isAllowedAction(fn)
  );
});
</script>

<style>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  font-family:
    system-ui,
    -apple-system,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    "Noto Sans",
    "Liberation Sans",
    Arial,
    sans-serif,
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji";
}

.board {
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 800px;
  height: 800px;
}

.board-item {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: bold;
  background-color: #f0f0f0;
}
</style>
