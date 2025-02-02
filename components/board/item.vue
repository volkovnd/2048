<template>
  <div
    class="board-item row row-center shadow"
    :class="{ 'board-item-disabled': disabled, 'empty': !value }"
    :style="{ color: textColor }"
  >
    <div
      v-if="value"
      class="board-item-value"
    >
      {{ value }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ItemValue } from "~/types";

const props = defineProps<{
  value: ItemValue;
  disabled?: boolean;
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
  position: absolute;
  z-index: 3;
  width: var(--board-item-size);
  height: var(--board-item-size);
  font-size: calc(var(--board-item-size) / 2);
  background-color: var(--secondary);
  border: 1px solid #0003;
  border-radius: 5%;
  transition: all 0.2s ease-in-out;
}

.board-item.empty {
  z-index: 2;
  transition: none;
}

@keyframes new-value {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.board-item-value {
  animation: new-value 0.4s ease-in-out;
}

.board-item-disabled {
  cursor: no-drop;
  background-color: var(--disabled);
}
</style>
