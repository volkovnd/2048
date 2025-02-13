<template>
  <div
    class="board-item"
    :class="{ 'board-item-disabled': disabled, 'empty': !value }"
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
import type { ItemValue, ItemPosition } from "~/types";

const props = withDefaults(
  defineProps<{
    value: ItemValue;
    position?: ItemPosition;
    disabled?: boolean;
  }>(),
  {
    position: () => ({ x: 0, y: 0 })
  }
);

const translateX = computed(
  () => `calc(${props.position.x} * (var(--board-item-size) + var(--spacing)))`
);
const translateY = computed(
  () => `calc(${props.position.y} * (var(--board-item-size) + var(--spacing)))`
);

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

<style>
.board-item {
  position: absolute;
  top: var(--spacing);
  left: var(--spacing);

  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--board-item-size);
  height: var(--board-item-size);

  font-size: calc(var(--board-item-size) / 3);

  color: v-bind(textColor);

  background-color: var(--secondary);
  border: 1px solid #0003;
  border-radius: 5%;
  box-shadow:
    0 1px 3px -1px #0003,
    0 3px 5px #00000024,
    0 1px 9px #0000001f;

  transform: translateX(v-bind(translateX)) translateY(v-bind(translateY));
  transition: all 0.2s ease-in-out;
}

.dark-mode .board-item {
  box-shadow:
    0 1px 3px -1px #fff3,
    0 3px 5px #ffffff24,
    0 1px 9px #ffffff1f;
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
