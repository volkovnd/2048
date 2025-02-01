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
          <BoardItem
            v-for="item in computedItems"
            :id="`item-${item.id}`"
            :key="item.id"
            :value="item.value"
            :disabled="isFinished"
            :style="{
              left: `calc(${item.x} * (var(--board-item-size) + var(--gap)) + var(--gap))`,
              top: `calc(${item.y} * (var(--board-item-size) + var(--gap)) + var(--gap))`
            }"
          />
        </ClientOnly>
      </BoardContainer>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import type { ItemDashboard } from "@/types";

/** В каждом раунде появляется плитка номинала «2» (с вероятностью 90 %) или «4» (с вероятностью 10 %) */
const addRandomItem = (items: ItemDashboard) => {
  const emptyItems = items.filter((item) => item.value === null);

  const randIndex = randomInt(emptyItems.length - 1);

  const val = randomInt(10, 0) < 9 ? 2 : 4;

  emptyItems[randIndex].value = val;

  return items;
};

const generateInitialBoard = (): ItemDashboard =>
  addRandomItem(
    Array.from({ length: 16 }, (_, i) => ({
      value: null,
      id: i
    }))
  );

const items = useSessionStorage<ItemDashboard>("2048-items", generateInitialBoard());

const computedItems = computed(() =>
  items.value
    .map((item, index) => ({ ...item, x: index % 4, y: Math.floor(index / 4) }))
    .sort((a, b) => a.id - b.id)
);

const result = ref(0);

const addToResult = (value: number) => {
  result.value += value;
};

const isAllowedAction = (action: () => ItemDashboard) => {
  const result = action();

  return !isEqualBoard(result, items.value);
};

const createOnKeyHandler = (createResultFn: () => ItemDashboard) => {
  return () => {
    const result = createResultFn();

    if (!isEqualBoard(result, items.value)) {
      items.value = addRandomItem(result);
    }
  };
};

const onLeft = (cb?: (value: number) => void) => () =>
  mapRows(items.value, (row) => processArrOnMoveLeft(row, cb));

const onRight = (cb?: (value: number) => void) => () =>
  mapRows(items.value, (row) => processArrOnMoveRight(row, cb));

const onUp = (cb?: (value: number) => void) => () =>
  mapColumns(items.value, (column) => processArrOnMoveLeft(column, cb));

const onDown = (cb?: (value: number) => void) => () =>
  mapColumns(items.value, (column) => processArrOnMoveRight(column, cb));

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
