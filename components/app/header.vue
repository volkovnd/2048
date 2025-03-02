<template>
  <header id="header">
    <div class="header-col">
      <ClientOnly>
        <h3 class="header-title">Результат: {{ score }}</h3>
      </ClientOnly>
    </div>

    <div class="header-col">
      <UiButton
        label="Заново"
        :icon="mdiRepeat"
        @click="$emit('reset')"
      />

      <ColorScheme placeholder="theme">
        <UiButton
          v-if="$colorMode.value === 'dark'"
          :icon="mdiWhiteBalanceSunny"
          @click="$colorMode.preference = 'light'"
        />

        <UiButton
          v-else
          :icon="mdiMoonWaningCrescent"
          @click="$colorMode.preference = 'dark'"
        />
      </ColorScheme>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { mdiMoonWaningCrescent, mdiWhiteBalanceSunny, mdiRepeat } from "@mdi/js";

defineEmits<{
  reset: [];
}>();

defineProps<{
  score?: number;
}>();
</script>

<style lang="css">
#header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: var(--header-height);
}

.header-col {
  display: flex;
  gap: var(--spacing);
  align-items: center;
}

.header-title {
  font-size: 1.5rem;
  font-weight: 400;
}
</style>
