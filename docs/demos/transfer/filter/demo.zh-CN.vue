<template>
  <Transfer
    v-model:value="value"
    :options="options"
    filter
    :paged="paged"
  ></Transfer>
  <p>
    是否分页：
    <Switch v-model:value="paged"></Switch>
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(Array.from({ length: 20 }, (_, index) => index))
const paged = ref(false)
const options = Array.from({ length: 40 }, (_, index) => ({
  value: index,
  label: `选项${index + 1}`,
  disabled: index % 6 === 0
}))
</script>
