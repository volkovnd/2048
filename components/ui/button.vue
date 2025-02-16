<template>
  <button
    class="ui-button"
    :type="type"
  >
    <UiIcon
      v-if="icon"
      class="ui-button-icon"
      :icon="icon"
    />

    <div
      v-if="label"
      class="ui-button-label"
    >
      {{ label }}
    </div>
  </button>
</template>

<script lang="ts" setup>
import type { ButtonHTMLAttributes } from "vue";

withDefaults(
  defineProps<{
    type?: ButtonHTMLAttributes["type"];
    icon?: string;
    label?: string;
  }>(),
  {
    type: "button",
    icon: undefined,
    label: undefined
  }
);
</script>

<style>
.ui-button {
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  padding: calc(var(--spacing) / 2) var(--spacing);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: white;
  cursor: pointer;
  background-color: var(--primary);
  border: none;
  border-radius: var(--base-border-radius);

  box-shadow:
    0 1px 3px -1px #0003,
    0 3px 5px #00000024,
    0 1px 9px #0000001f;
}

.ui-button-icon {
  display: block;
}

.ui-button-icon + .ui-button-label {
  margin-left: calc(var(--spacing) / 2);
}
</style>
q
