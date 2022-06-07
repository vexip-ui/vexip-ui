<template>
  <AutoComplete
    v-model:value="value"
    :options="options"
    style="width: 400px;"
    @input="setOptions"
  >
    <template #default="{ option }">
      <Option :value="option.value" :label="option.label"></Option>
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
        `${value}@sina.com`
      ]
    : []
}
</script>
