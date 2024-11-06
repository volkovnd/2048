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
  gap: 10px;
  width: 800px;
  height: 800px;
}
</style>
