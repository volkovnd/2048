<template>
  <button
    class="ui-button"
    :type="type"
  >
    <svg
      v-if="icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      :width="24"
      :height="24"
    >
      <path
        :d="icon"
        fill="currentColor"
      />
    </svg>

    <slot />
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  type?: "button";
  icon?: string;
}>();
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
