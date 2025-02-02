<template>
  <div class="container">
    <slot />
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  max-width: calc(var(--board-size) + 2 * var(--spacing));
  padding-right: var(--spacing);
  padding-left: var(--spacing);
  margin-right: auto;
  margin-left: auto;
}
</style>
