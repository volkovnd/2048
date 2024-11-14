<template>
  <div class="board">
    <slot />
  </div>
</template>

<style scoped>
.board {
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(4, 1fr);
  gap: var(--gap);
  width: var(--board-size);
  height: var(--board-size);
  padding: calc(var(--gap) / 2);
  margin-right: auto;
  margin-left: auto;
}
</style>
