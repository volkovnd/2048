<template>
  <button
    class="ui-button"
    :type="type"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
defineProps<{ type?: "button" }>();
</script>

<style scoped>
.ui-button {
  align-items: stretch;
  font-size: max(0.875rem, calc(20 * (100vmin / 1000)));
  font-weight: 400;
  line-height: 1.25;
  color: white;
  cursor: pointer;
  background-color: var(--primary);
  border: none;
  border-radius: 10%;
}
</style>
