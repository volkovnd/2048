<template>
  <NuxtLayout>
    <div
      style="width: 100%; max-width: 900px"
      class="my-gap mx-auto"
    >
      <h2 class="mt-none">{{ error.statusCode }}</h2>
      <p v-if="error.message">{{ error.message }}</p>
      <UiButton @click="handleError">Вернуться на главную</UiButton>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps<{
  error: NuxtError;
}>();

const handleError = () => clearError({ redirect: "/" });
</script>
