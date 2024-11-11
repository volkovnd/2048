<template>
  <div
    class="board-item"
    :style="{ color: textColor }"
  >
    {{ value }}
  </div>
</template>

<script setup lang="ts">
import type { Item } from "~/types";

const props = defineProps<{
  value: Item;
}>();

const textColor = computed(() => {
  switch (props.value) {
    case 2:
      return "#000";
    case 4:
      return "#330";
    case 8:
      return "#660";
    case 16:
      return "#880";
    case 32:
      return "#828";
    case 64:
      return "#848";
    case 128:
      return "#858";
    case 256:
      return "#999";
    case 512:
      return "#688";
    case 1024:
      return "#288";
    case 2048:
      return "#088";
    default:
      return undefined;
  }
});
</script>

<style scoped>
.board-item {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  background-color: #f0f0f0;
}
</style>
