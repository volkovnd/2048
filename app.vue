<template>
  <div>
    <AppHeader
      :score="result"
      :result="isWinned ? 'Вы победили!' : isLosed ? 'Игра закончена!' : ''"
      class="container"
      @reset="reset"
    />
    <div
      id="board"
      ref="boardRef"
      class="container"
    >
      <ClientOnly>
        <BoardItem
          v-for="item in computedItems"
          :id="`item-${item.id}`"
          :key="item.id"
          :value="item.value"
          :disabled="isLosed || isWinned"
          :position="item.position"
        />
      </ClientOnly>
    </div>
  </div>
  <div />
</template>

<script setup lang="ts">
import type { HistoryItem, Item, ItemDashboard } from "@/types";

/** В каждом раунде появляется плитка номинала «2» (с вероятностью 90 %) или «4» (с вероятностью 10 %) */
const addRandomItem = (items: ItemDashboard) => {
  const result = clone(items);

  const emptyItems = result.filter((item) => item.value === null);

  const randIndex = randomInt(emptyItems.length - 1);

  const val = randomInt(10, 0) < 9 ? 2 : 4;

  emptyItems[randIndex].value = val;

  return result;
};

const generateInitialBoard = (): ItemDashboard =>
  addRandomItem(Array.from({ length: 16 }, () => createItem()));

const items = useSessionStorage<ItemDashboard>("2048-items", generateInitialBoard());

const computedItems = computed<Item[]>(() =>
  clone(items.value)
    .map((item, index) => ({
      ...item,
      position: { x: getXFromIndex(index), y: getYFromIndex(index) }
    }))
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

const createOnKeyHandler = (createResultFn: (cb?: (value: number) => void) => ItemDashboard) => {
  return () => {
    const result = createResultFn(addToResult);

    if (!isEqualBoard(result, items.value)) {
      items.value = addRandomItem(result);
    }
  };
};

const onLeft = (cb?: (value: number) => void) =>
  mapRows(items.value, (row) => processArrOnMoveLeft(row, cb));

const onRight = (cb?: (value: number) => void) =>
  mapRows(items.value, (row) => processArrOnMoveRight(row, cb));

const onUp = (cb?: (value: number) => void) =>
  mapColumns(items.value, (column) => processArrOnMoveLeft(column, cb));

const onDown = (cb?: (value: number) => void) =>
  mapColumns(items.value, (column) => processArrOnMoveRight(column, cb));

onKeyStroke("ArrowLeft", createOnKeyHandler(onLeft));
onKeyStroke("ArrowRight", createOnKeyHandler(onRight));
onKeyStroke("ArrowUp", createOnKeyHandler(onUp));
onKeyStroke("ArrowDown", createOnKeyHandler(onDown));

const boardRef = templateRef<HTMLDivElement>("boardRef");

const { isSwiping, direction } = useSwipe(boardRef);

watch([isSwiping, direction], ([isSwiping, direction]) => {
  const swipeHandler = (createResultFn: (cb?: (value: number) => void) => ItemDashboard) => {
    const result = createResultFn(addToResult);

    if (!isEqualBoard(result, items.value)) {
      items.value = addRandomItem(result);
    }
  };

  if (isSwiping) {
    if (direction === "left") {
      swipeHandler(onLeft);
    } else if (direction === "right") {
      swipeHandler(onRight);
    } else if (direction === "up") {
      swipeHandler(onUp);
    } else if (direction === "down") {
      swipeHandler(onDown);
    }
  }
});

const isWinned = computed(() => items.value.some((item) => item.value === 2048));
const isLosed = ref(false);

watch(
  items,
  () => {
    isLosed.value = [onLeft, onRight, onUp, onDown].every((fn) => !isAllowedAction(fn));
  },
  {
    immediate: true
  }
);

const reset = () => {
  items.value = generateInitialBoard();

  result.value = 0;

  isLosed.value = false;
};

const history = ref<HistoryItem[]>([]);

watch(
  items,
  () => {
    history.value.push({
      items: clone(items.value),
      score: result.value
    });
  },
  {
    immediate: true,
    deep: true
  }
);

const { z, r, control } = useMagicKeys();

watch([z, r, control], ([z, r, ctrl]) => {
  if (z && ctrl) {
    if (history.value.length > 1) {
      const prev = history.value[history.value.length - 2];

      history.value.splice(history.value.length - 1, 1);

      items.value = prev.items;
      result.value = prev.score;
    }
  } else if (r && ctrl) {
    reset();
  }
});
</script>

<style lang="css">
@import "normalize.css";

:root {
  --header-height: 4rem;
  --spacing: 1rem;

  --board-size: calc(100vmin - var(--header-height));
  --board-item-size: calc((var(--board-size) - 5 * var(--spacing)) / 4);

  --background-bg: #fff;
  --text-color: #000;

  --primary: #0097a7;
  --secondary: #f0f0f0;
  --disabled: #c8c8c8;
}

.dark-mode {
  --primary: #090e0f;
  --secondary: #b4b1b1;
  --background-bg: #393939;
  --disabled: #888686;
  --text-color: #fff;
}

html,
body {
  padding: 0;
  margin: 0;
}

html {
  font-family: Roboto, sans-serif;
}

body {
  color: var(--text-color);
  background-color: var(--background-bg);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.container {
  width: 100%;
  max-width: var(--board-size);

  padding-right: var(--spacing);
  padding-left: var(--spacing);

  margin-right: auto;
  margin-left: auto;
}

#board {
  position: relative;

  width: var(--board-size);
  height: var(--board-size);

  padding: var(--spacing);
}
</style>
