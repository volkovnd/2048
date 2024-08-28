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
type Item = number | null;
type ItemRow = Item[];
type ItemDashboard = ItemRow[];

const items = ref<ItemDashboard>(Array.from({ length: 4 }, () => Array.from({ length: 4 }, (_v, i) => null)));

const getEmptyItems = () =>
  items.value.reduce<Array<{ x: number; y: number }>>((acc, row, y) => {
    row.forEach((item, x) => {
      if (item === null) {
        acc.push({ x, y });
      }
    });

    return acc;
  }, []);

const addRandomItem = () => {
  const emptyItems = getEmptyItems();

  const randIndex = randomInt(emptyItems.length);

  items.value[emptyItems[randIndex].y][emptyItems[randIndex].x] = 2;
};

onMounted(() => {
  addRandomItem();
});

const removeSpaces = <T>(input: Array<T>): Array<T> => {
  return input.filter((input) => input !== null);
};

const processArrOnMoveRight = (input: ItemRow) => {
  let newRow: ItemRow = removeSpaces(input);

  for (let i = newRow.length - 1; i > 0; i--) {
    if (newRow[i] !== null && newRow[i] === newRow[i - 1]) {
      newRow[i - 1] = null;
      // @ts-ignore
      newRow[i] = newRow[i] * 2;
    }
  }

  newRow = createArrOfNulls(4 - newRow.length).concat(newRow);

  return newRow;
};

const processArrOnMoveLeft = (input: ItemRow) => {
  let newRow: ItemRow = removeSpaces(input);

  for (let i = 0; i < newRow.length - 1; i++) {
    if (newRow[i] !== null && newRow[i] === newRow[i + 1]) {
      newRow[i + 1] = null;
      // @ts-ignore
      newRow[i] = newRow[i] * 2;
    }
  }

  newRow = newRow.concat(createArrOfNulls(4 - newRow.length));

  return newRow;
};

onKeyStroke("ArrowLeft", () => {
  const oldArray = clone(items.value);

  items.value.forEach((row, index) => {
    const result = processArrOnMoveLeft(row);

    items.value[index] = result;
  });

  if (!isEqual(oldArray, items.value)) {
    addRandomItem();
  }
});

onKeyStroke("ArrowRight", () => {
  const oldArray = clone(items.value);

  items.value.forEach((row, index) => {
    const result = processArrOnMoveRight(row);

    items.value[index] = result;
  });

  if (!isEqual(oldArray, items.value)) {
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

    newRow = processArrOnMoveRight(newRow);

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
