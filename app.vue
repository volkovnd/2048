<template>
  <h3
    v-if="isFinished"
    style="font-size: 40px; text-align: center"
  >
    Игра закончена!
  </h3>
  <BoardContainer>
    <template
      v-for="(row, x) in items"
      :key="x"
    >
      <BoardItem
        v-for="(item, y) in row"
        :key="y"
        :value="item"
      />
    </template>
  </BoardContainer>
</template>

<script setup lang="ts">
import type { ItemDashboard } from "@/types";

useSeoMeta({
  title: "2048"
});

const items = ref<ItemDashboard>(
  Array.from({ length: 4 }, () => Array(4).fill(null))
);

const addRandomItem = () => {
  const emptyItems: Array<{ x: number; y: number }> = [];

  items.value.forEach((row, y) => {
    row.forEach((item, x) => {
      if (item === null) {
        emptyItems.push({ x, y });
      }
    });
  });

  const randIndex = randomInt(emptyItems.length - 1);

  items.value[emptyItems[randIndex].y][emptyItems[randIndex].x] = Math.pow(
    2,
    randomInt(2, 1)
  );
};

const isAllowedAction = (action: () => ItemDashboard) => {
  const result = action();

  return !isEqualBoard(result, items.value);
};

const createOnKeyHandler = (createResultFn: () => ItemDashboard) => {
  return () => {
    const result = createResultFn();

    if (!isEqualBoard(result, items.value)) {
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

onMounted(() => {
  addRandomItem();
});
</script>
