<template>
  <p>Loading and editable:</p>
  <Transfer v-model:value="value" :loading="loading" :options="options"></Transfer>
  <p>Loading and readonly:</p>
  <Transfer
    v-model:value="value"
    :loading="loading"
    loading-lock
    :options="options"
  ></Transfer>
  <p>
    Loading:
    <Switch v-model:value="loading"></Switch>
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
const value = ref(Array.from({ length: 20 }, (_, index) => index))
const options = Array.from({ length: 40 }, (_, index) => ({
  value: index,
  label: `Option ${index + 1}`,
  disabled: index % 6 === 0
}))
</script>
