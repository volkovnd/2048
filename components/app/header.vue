<template>
  <header id="header">
    <div class="header-col">
      <h3 class="score-title">Результат: {{ score }}</h3>
    </div>

    <div class="header-col">
      <ClientOnly>
        <h3
          v-if="result"
          class="result-title"
        >
          {{ result }}
        </h3>
      </ClientOnly>
    </div>

    <div class="header-col">
      <UiButton @click="$emit('reset')"> Заново </UiButton>

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
import { mdiMoonWaningCrescent, mdiWhiteBalanceSunny } from "@mdi/js";

defineEmits<{
  reset: [];
}>();

defineProps<{
  score?: number;
  result?: string;
}>();
</script>

<style lang="css">
#header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: var(--header-height);

  padding-top: var(--spacing);
  padding-bottom: var(--spacing);
}

.header-col {
  display: flex;
  gap: var(--spacing);
  align-items: center;
}

.score-title,
.result-title {
  font-size: 1.5rem;
}
</style>
