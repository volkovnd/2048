<template>
  <button
    class="ui-button"
    :type="type"
  >
    <svg
      v-if="icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      :width="20"
      :height="20"
    >
      <path
        :d="icon"
        fill="currentColor"
      />
    </svg>

    <div
      v-if="!!$slots.default || label"
      class="label"
    >
      <slot>{{ label }}</slot>
    </div>
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  type?: "button";
  icon?: string;
  label?: string;
}>();
</script>

<style scoped>
.ui-button {
  display: flex;
  gap: calc(var(--spacing) / 2);
  align-items: center;
  min-height: 32px;
  padding: calc(var(--spacing) / 4) calc(var(--spacing) * 3 / 4);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: white;
  cursor: pointer;
  background-color: var(--primary);
  border: none;
  border-radius: 10%;
}

.ui-button svg {
  display: block;
}
</style>
