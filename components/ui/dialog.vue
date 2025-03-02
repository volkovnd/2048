<template>
  <div
    v-if="model"
    class="ui-dialog-backdrop"
    @click.self="hide"
  >
    <div class="ui-dialog">
      <slot
        name="default"
        v-bind="{ show, hide }"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  "hide": [];
  "show": [];
}>();

const model = defineModel<boolean>();

const show = () => {
  model.value = true;

  emit("show");
};

const hide = () => {
  model.value = false;

  emit("hide");
};

defineExpose({
  show,
  hide
});
</script>

<style>
.ui-dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 100;
  width: 400px;
  max-width: 90vw;
  max-height: 90vh;
  padding: 1rem;
  overflow-y: auto;
  cursor: default;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  transform: translate(-50%, -50%);
}

.ui-dialog-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 100%;

  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
