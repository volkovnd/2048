<template>
  <div class="board">
    <slot />
  </div>
</template>

<style scoped>
.board {
  --gap: 10px;
  --size: 100vmin;

  box-sizing: border-box;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(4, 1fr);
  gap: var(--gap);
  width: var(--size);
  height: var(--size);
  padding: var(--gap);
  margin-right: auto;
  margin-left: auto;
}
</style>
