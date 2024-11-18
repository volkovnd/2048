<template>
  <header
    id="header"
    class="row row-center mx-auto"
  >
    <slot name="status" />

    <div style="flex-grow: 1" />

    <button
      type="button"
      class="ui-button mx-gap"
      @click="$emit('reset')"
    >
      Заново
    </button>

    <button
      v-if="$colorMode.value === 'dark'"
      type="button"
      class="ui-button mx-gap"
      @click="$colorMode.preference = 'light'"
    >
      Светлая
    </button>

    <button
      v-else
      type="button"
      class="ui-button mx-gap"
      @click="$colorMode.preference = 'dark'"
    >
      Темная
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
  width: var(--board-size);
  height: var(--header-height);
  padding: calc(var(--gap) / 2);
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
