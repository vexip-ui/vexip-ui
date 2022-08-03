<template>
  <Transfer v-model:value="value" :options="options" :paged="paged"></Transfer>
  <p>
    Paged:
    <Switch v-model:value="paged"></Switch>
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(Array.from({ length: 20 }, (_, index) => index))
const paged = ref(true)
const options = Array.from({ length: 40 }, (_, index) => ({
  value: index,
  label: `Option ${index + 1}`,
  disabled: index % 6 === 0
}))
</script>
