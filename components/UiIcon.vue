<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    :width="size"
    :height="size"
  >
    <path
      :d="path"
      :fill="fill"
    />
  </svg>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    path: string;
    fill?: string;
    size?: number;
  }>(),
  {
    size: 24,
    fill: "currentColor"
  }
);
</script>
