<template>
  <div class="board mx-auto">
    <slot />
  </div>
</template>

<style scoped>
.board {
  position: relative;

  width: var(--board-size);
  height: var(--board-size);
}
</style>
