<template>
  <div class="board-item">
    <slot />
  </div>
</template>

<style scoped>
.board-item {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: bold;
  background-color: #f0f0f0;
}
</style>
