<template>
  <AutoComplete
    v-model:value="value"
    filter
    :options="options"
    style="max-width: 400px"
  ></AutoComplete>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<number>()

const options = Array.from({ length: 3 }, (_, index) => ({
  label: `分组${index + 1}`,
  group: true,
  children: [
    `选项${index + 1}-1`,
    { value: `选项${index + 1}-2`, disabled: true },
    `选项${index + 1}-3`,
    `选项${index + 1}-4`,
  ],
}))
</script>
