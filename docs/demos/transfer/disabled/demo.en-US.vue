<template>
  <Transfer v-model:value="value" :options="options" :disabled="disabled"></Transfer>
  <p>
    Disabled:
    <Switch v-model:value="disabled"></Switch>
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(Array.from({ length: 20 }, (_, index) => index))
const disabled = ref(true)
const options = Array.from({ length: 40 }, (_, index) => ({
  value: index,
  label: `Option ${index + 1}`,
  disabled: index % 6 === 0
}))
</script>
