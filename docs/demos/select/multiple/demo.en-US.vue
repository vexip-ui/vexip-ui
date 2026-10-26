<template>
  <p>Current values: {{ values }}</p>
  <p>
    Disabled:
    <Switch v-model:value="disabled"></Switch>
  </p>
  <Select
    v-model:value="values"
    multiple
    clearable
    option-check
    :disabled="disabled"
    :count-limit="3"
    :options="options"
  ></Select>
  <br />
  <br />
  <Select
    multiple
    clearable
    option-check
    :disabled="disabled"
    :max-tag-count="3"
    :options="options"
  ></Select>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const values = ref<number[]>([])
const disabled = ref(false)
const options = Array.from({ length: 12 }, (_, i) => ({
  label: `Option ${i + 1}`,
  value: i + 1,
}))
</script>

<style scoped>
.vxp-select {
  max-width: 400px;
}
</style>
