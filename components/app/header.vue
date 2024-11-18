<template>
  <header
    id="header"
    class="row row-gap px-gap py-gap mx-auto"
  >
    <slot name="status" />

    <div style="flex-grow: 1" />

    <button
      type="button"
      class="ui-button px-gap"
      @click="$emit('reset')"
    >
      Заново
    </button>

    <ColorScheme placeholder="theme">
      <button
        v-if="$colorMode.value === 'dark'"
        type="button"
        class="ui-button py-gap px-gap"
        @click="$colorMode.preference = 'light'"
      >
        <Icon
          name="ic:outline-light-mode"
          :size="20"
        />
      </button>

      <button
        v-else
        type="button"
        class="ui-button py-gap px-gap"
        @click="$colorMode.preference = 'dark'"
      >
        <Icon
          name="ic:outline-dark-mode"
          :size="20"
        />
      </button>
    </ColorScheme>
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
