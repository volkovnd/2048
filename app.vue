<template>
  <div id="wrapper">
    <AppHeader
      :score="score"
      :has-possible-steps="hasPossibleSteps"
      @reset="reset"
    />
    <div
      id="board"
      ref="boardRef"
    >
      <ClientOnly>
        <BoardItem
          v-for="item in computedItems"
          :id="`item-${item.id}`"
          :key="item.id"
          :value="item.value"
          :has-possible-steps="hasPossibleSteps"
          :position="item.position"
        />
      </ClientOnly>
    </div>
  </div>
  <div />
</template>

<script setup lang="ts">
import type { Item, ItemDashboard } from "@/types";

// Доска и ее элименты
const boardRef = useTemplateRef("boardRef");

const addRandomItem = (items: ItemDashboard) => {
  /** В каждом раунде появляется плитка номинала «2» (с вероятностью 90 %) или «4» (с вероятностью 10 %) */

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

// Очки
const { addToScore, score } = useScore();

// Обработка передвижений и кнопок клавиатуры / свайпов

// Наличие возможных ходов
const hasPossibleSteps = computed(() => {
  // Пока имеется хотя бы одна пустая ячейка, то игра продолжается
  if (items.value.some((item) => item.value === null)) {
    return true;
  }

  // Проверка, что в ряду нет двух одинаковых элементов
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      if (
        // Если текущее значение равно следующему по горизонтали, то игра продолжается
        items.value[i * 4 + j].value === items.value[i * 4 + (j + 1)].value ||
        // Если текущее значение равно следующему по вертикали, то игра продолжается
        items.value[j * 4 + i].value === items.value[(j + 1) * 4 + i].value
      ) {
        return true;
      }
    }
  }

  return false;
});

const moveHandler = (createResultFn: (cb?: (value: number) => void) => ItemDashboard) => {
  const result = createResultFn(addToScore);

  if (!isEqualBoard(result, items.value)) {
    items.value = addRandomItem(result);
  }
};

const onLeft = (cb?: (value: number) => void) =>
  mapRows(items.value, (row) => moveItemsLeft(row, cb));

const onRight = (cb?: (value: number) => void) =>
  mapRows(items.value, (row) => moveItemsRight(row, cb));

const onUp = (cb?: (value: number) => void) =>
  mapColumns(items.value, (column) => moveItemsLeft(column, cb));

const onDown = (cb?: (value: number) => void) =>
  mapColumns(items.value, (column) => moveItemsRight(column, cb));

onKeyStroke(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"], (e) => {
  switch (e.key) {
    case "ArrowLeft":
      moveHandler(onLeft);

      break;
    case "ArrowRight":
      moveHandler(onRight);

      break;
    case "ArrowUp":
      moveHandler(onUp);

      break;
    case "ArrowDown":
      moveHandler(onDown);

      break;
  }
});

useSwipe(boardRef, {
  onSwipeEnd(e, direction) {
    switch (direction) {
      case "left":
        moveHandler(onLeft);

        break;
      case "right":
        moveHandler(onRight);

        break;
      case "up":
        moveHandler(onUp);

        break;
      case "down":
        moveHandler(onDown);

        break;
    }
  }
});

const { prevStep, history } = useHistory(items, score);

const reset = () => {
  history.value = [];

  score.value = 0;

  items.value = generateInitialBoard();
};

onKeyStroke("z", (e) => {
  if (e.ctrlKey) {
    e.preventDefault();

    prevStep();
  }
});

onKeyStroke("r", (e) => {
  if (e.ctrlKey) {
    e.preventDefault();

    reset();
  }
});
</script>

<style lang="css">
@import "normalize.css";

:root {
  --header-height: 4rem;

  --base-border-radius: 0.5rem;

  --spacing: 1rem;

  --board-size: min(
    calc(100vw - var(--spacing) * 2),
    calc(100vh - var(--header-height) - var(--spacing) * 2)
  );

  --board-item-size: calc((var(--board-size) - 3 * var(--spacing)) / 4);

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
  overflow: hidden;

  color: var(--text-color);
  background-color: var(--background-bg);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

#wrapper {
  width: calc(var(--board-size) + var(--spacing) * 2);

  padding-right: var(--spacing);
  padding-left: var(--spacing);

  margin-right: auto;
  margin-left: auto;
}

#board {
  position: relative;

  width: var(--board-size);
  height: var(--board-size);

  margin-top: var(--spacing);
  margin-bottom: var(--spacing);
}
</style>
