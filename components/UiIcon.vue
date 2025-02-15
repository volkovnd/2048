<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="viewBox"
    :width="width"
    :height="height"
  >
    <path
      :d="icon"
      :fill="fill"
    />
  </svg>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{ icon: string; width?: number; height?: number; viewBox?: string; fill?: string }>(),
  {
    width: 24,
    height: 24,

    fill: "currentColor",

    viewBox: "0 0 24 24"
  }
);
</script>
