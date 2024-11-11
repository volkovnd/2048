<template>
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

  <h3
    v-if="isFinished"
    style="font-size: 40px; text-align: center"
  >
    Игра закончена!
  </h3>
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
