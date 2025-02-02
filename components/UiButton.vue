<template>
  <button
    class="ui-button"
    :type="type"
  >
    <UiIcon
      v-if="icon"
      :path="icon"
      :size="24"
      style="display: block"
    />
    <slot />
  </button>
</template>

<script lang="ts" setup>
defineProps<{ type?: "button"; icon?: string }>();
</script>

<style scoped>
.ui-button {
  align-items: stretch;
  min-height: 32px;
  padding: calc(var(--spacing) / 4) calc(var(--spacing) / 2);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: white;
  cursor: pointer;
  background-color: var(--primary);
  border: none;
  border-radius: 10%;
}
</style>
