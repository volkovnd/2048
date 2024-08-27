<template>
  <div class="wrapper">
    <div class="board">
      <template v-for="(row, index) in items" :key="index">
        <div v-for="(item, index) in row" :key="index" class="board-item">
          {{ item }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const items = ref<Array<number | null>[]>(
  Array.from({ length: 4 }, () => Array.from({ length: 4 }, (_v, i) => null))
);

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

  const randIndex = Math.floor(Math.random() * emptyItems.length);

  items.value[emptyItems[randIndex].y][emptyItems[randIndex].x] = 2;
};

onMounted(() => {
  addRandomItem();
});

const removeSpaces = (input: Array<number | null>) => {
  return input.filter((input) => input !== null);
};

// Клонирование массива
const cloneArr = <T>(input: T) => {
  return JSON.parse(JSON.stringify(input)) as T;
};

// Глубокое сравнение, что массивы одинаковы. Необходимо, чтобы не производить добавление нового элемента
const isEqualArrs = (
  arr1: Array<number | null>[],
  arr2: Array<number | null>[]
) => {
  return arr1.every((v, i) => v.every((v2, i2) => v2 === arr2[i][i2]));
};

const processArrOnMoveRight = (input: Array<number | null>) => {
  let newRow: Array<number | null> = removeSpaces(input);

  for (let i = newRow.length - 1; i > 0; i--) {
    if (newRow[i] !== null && newRow[i] === newRow[i - 1]) {
      newRow[i - 1] = null;
      // @ts-ignore
      newRow[i] = newRow[i] * 2;
    }
  }

  newRow = Array.from(
    { length: 4 - newRow.length },
    (): number | null => null
  ).concat(newRow);

  return newRow;
};

const processArrOnMoveLeft = (input: Array<number | null>) => {
  let newRow: Array<number | null> = removeSpaces(input);

  for (let i = 0; i < newRow.length - 1; i++) {
    if (newRow[i] !== null && newRow[i] === newRow[i + 1]) {
      newRow[i + 1] = null;
      // @ts-ignore
      newRow[i] = newRow[i] * 2;
    }
  }

  newRow = newRow.concat(
    Array.from({ length: 4 - newRow.length }, (): number | null => null)
  );

  return newRow;
};

onKeyStroke("ArrowLeft", () => {
  const oldArray = cloneArr(items.value);

  items.value.forEach((row, index) => {
    const result = processArrOnMoveLeft(row);

    items.value[index] = result;
  });

  if (!isEqualArrs(oldArray, items.value)) {
    addRandomItem();
  }
});

onKeyStroke("ArrowRight", () => {
  const oldArray = cloneArr(items.value);

  items.value.forEach((row, index) => {
    const result = processArrOnMoveRight(row);

    items.value[index] = result;
  });

  if (!isEqualArrs(oldArray, items.value)) {
    addRandomItem();
  }
});

onKeyStroke("ArrowUp", () => {
  const oldArray = cloneArr(items.value);

  for (let i = 0; i < 4; i++) {
    let newRow: Array<number | null> = [];

    items.value.forEach((row) => {
      newRow.push(row[i]);
    });

    newRow = processArrOnMoveLeft(newRow);

    for (let j = 0; j < items.value.length; j++) {
      items.value[j][i] = newRow[j];
    }
  }

  if (!isEqualArrs(oldArray, items.value)) {
    addRandomItem();
  }
});

onKeyStroke("ArrowDown", () => {
  const oldArray = cloneArr(items.value);

  for (let i = 0; i < 4; i++) {
    let newRow: Array<number | null> = [];

    items.value.forEach((row, index) => {
      newRow.push(row[i]);
    });

    newRow = processArrOnMoveRight(newRow);

    for (let j = 0; j < items.value.length; j++) {
      items.value[j][i] = newRow[j];
    }
  }

  if (!isEqualArrs(oldArray, items.value)) {
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
