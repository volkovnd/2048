<template>
  <div>
    <NuxtLayout>
      <AppHeader @reset="reset">
        <template #status>
          <ClientOnly>
            <h3
              style="font-size: max(3.5vmin, 1rem); text-align: center"
              class="my-auto"
            >
              Результат: {{ result }}
            </h3>
            <h3
              v-if="isFinished"
              class="my-none mx-auto"
              style="font-size: max(3.5vmin, 1rem); text-align: center"
            >
              Игра закончена!
            </h3>
          </ClientOnly>
        </template>
      </AppHeader>

      <BoardContainer>
        <ClientOnly>
          <template
            v-for="(row, x) in items"
            :key="x"
          >
            <BoardItem
              v-for="(item, y) in row"
              :key="y"
              :value="item"
              :disabled="isFinished"
            />
          </template>
        </ClientOnly>
      </BoardContainer>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import type { ItemDashboard } from "@/types";

const generateInitialBoard = () => {
  const items = Array.from({ length: 4 }, () =>
    Array.from({ length: 4 }, () => null)
  ) as ItemDashboard;

  const x = randomInt(3);
  const y = randomInt(3);

  items[y][x] = randomInt(10, 0) < 9 ? 2 : 4;

  return items;
};

const items = useSessionStorage<ItemDashboard>("2048-items", generateInitialBoard());

const result = ref(0);

const addToResult = (value: number) => {
  result.value += value;
};

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

const onLeft = (cb?: (value: number) => void) => () => processArrOnMoveLeft(clone(items.value), cb);
const onRight = (cb?: (value: number) => void) => () =>
  processArrOnMoveRight(clone(items.value), cb);
const onUp = (cb?: (value: number) => void) => () =>
  rotateArrRight(processArrOnMoveLeft(rotateArrLeft(clone(items.value)), cb));
const onDown = (cb?: (value: number) => void) => () =>
  rotateArrRight(processArrOnMoveRight(rotateArrLeft(clone(items.value)), cb));

onKeyStroke("ArrowLeft", createOnKeyHandler(onLeft(addToResult)));
onKeyStroke("ArrowRight", createOnKeyHandler(onRight(addToResult)));
onKeyStroke("ArrowUp", createOnKeyHandler(onUp(addToResult)));
onKeyStroke("ArrowDown", createOnKeyHandler(onDown(addToResult)));

const isFinished = ref(false);

watch(
  items,
  () => {
    isFinished.value = [onLeft, onRight, onUp, onDown].every((fn) => !isAllowedAction(fn()));
  },
  {
    immediate: true
  }
);

const reset = () => {
  items.value = generateInitialBoard();

  result.value = 0;

  isFinished.value = false;
};
</script>
