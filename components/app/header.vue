<template>
  <header
    id="header"
    class="row row-gap px-gap py-gap mx-auto"
  >
    <slot name="status" />

    <UiButton
      class="ml-auto px-gap"
      @click="$emit('reset')"
    >
      Заново
    </UiButton>

    <ColorScheme placeholder="theme">
      <UiButton
        v-if="$colorMode.value === 'dark'"
        class="py-gap px-gap"
        @click="$colorMode.preference = 'light'"
      >
        <UiIcon
          :path="mdiWhiteBalanceSunny"
          :size="20"
        />
      </UiButton>

      <UiButton
        v-else
        class="py-gap px-gap"
        @click="$colorMode.preference = 'dark'"
      >
        <UiIcon
          :path="mdiMoonWaningCrescent"
          :size="20"
        />
      </UiButton>
    </ColorScheme>
  </header>
</template>

<script lang="ts" setup>
import { mdiMoonWaningCrescent, mdiWhiteBalanceSunny } from "@mdi/js";

defineEmits<{
  reset: [];
}>();
</script>

<style lang="css">
#header {
  width: var(--board-size);
  height: var(--header-height);
  padding: calc(var(--gap) / 2);
}
</style>
