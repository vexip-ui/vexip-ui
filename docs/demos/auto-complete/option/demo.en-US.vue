<template>
  <AutoComplete
    v-model:value="value"
    :options="options"
    style="max-width: 400px"
    @input="setOptions"
  >
    <template #default="{ option }">
      <div>{{ option.label }}</div>
    </template>
  </AutoComplete>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = ref<string[]>([])

function setOptions(value: string) {
  options.value = value
    ? [
      `${value}@qq.com`,
      `${value}@gmail.com`,
      `${value}@163.com`,
      `${value}@126.com`,
      `${value}@sina.com`,
    ]
    : []
}
</script>
