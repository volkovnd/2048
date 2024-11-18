<template>
  <header id="header">
    <slot name="status" />

    <div style="flex-grow: 1" />

    <button
      type="button"
      class="ui-button"
      @click="$emit('reset')"
    >
      Заново
    </button>
  </header>
</template>

<script lang="ts" setup>
defineEmits<{
  reset: [];
}>();
</script>

<style lang="css">
#header {
  display: flex;
  align-items: center;
  width: var(--board-size);
  height: var(--header-height);
  padding: calc(var(--gap) / 2);
  margin-right: auto;
  margin-left: auto;
}

.ui-button {
  padding: 0.5rem 1rem;
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
