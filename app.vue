<template>
  <AppHeader @reset="reset">
    <template #status>
      <h3
        v-if="isFinished"
        style="font-size: max(3.5vmin, 1rem); text-align: center"
      >
        Игра закончена!
      </h3>
    </template>
  </AppHeader>
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

const items = ref<ItemDashboard>(Array.from({ length: 4 }, () => Array(4).fill(null)));

/** В каждом раунде появляется плитка номинала «2» (с вероятностью 90 %) или «4» (с вероятностью 10 %) */
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

  const val = randomInt(10, 0) < 9 ? 2 : 4;

  const { x, y } = emptyItems[randIndex];

  items.value[y][x] = val;
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
const onRight = () => clone(items.value).map((row) => processArrOnMoveRight(row));
const onUp = () => rotateArr(rotateArr(items.value).map((row) => processArrOnMoveLeft(row)));
const onDown = () => rotateArr(rotateArr(items.value).map((row) => processArrOnMoveRight(row)));

onKeyStroke("ArrowLeft", createOnKeyHandler(onLeft));
onKeyStroke("ArrowRight", createOnKeyHandler(onRight));
onKeyStroke("ArrowUp", createOnKeyHandler(onUp));
onKeyStroke("ArrowDown", createOnKeyHandler(onDown));

const isFinished = ref(false);

watch(items, () => {
  isFinished.value = [onLeft, onRight, onUp, onDown].every((fn) => !isAllowedAction(fn));
});

onMounted(() => {
  addRandomItem();
});

const reset = () => {
  items.value = Array.from({ length: 4 }, () => Array(4).fill(null));

  addRandomItem();

  isFinished.value = false;
};
</script>
