<template>
  <p>
    显示全部标签：
    <Switch v-model:value="showAllTags"></Switch>
  </p>
  <NumberInput v-model:value="maxCount" :min="0" :disabled="showAllTags"></NumberInput>
  <p>
    隐藏额外气泡：
    <Switch v-model:value="noRestTip"></Switch>
  </p>
  <Cascader
    :value="value"
    :options="options"
    multiple
    clearable
    :max-tag-count="showAllTags ? Infinity : maxCount"
    :no-rest-tip="noRestTip"
  ></Cascader>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showAllTags = ref(false)
const maxCount = ref(0)
const noRestTip = ref(false)
const value = ref([])
const options = createOptions(3)

function createOptions(depth: number, prefix = 'Op', iterator = 1) {
  const options: Array<Record<string, any>> = []
  const isLeaf = iterator === depth

  for (let i = 1; i <= 10; ++i) {
    options.push({
      value: `${prefix}-${i}`,
      label: `${prefix}-${i}`,
      disabled: i % 4 === 0,
      children: isLeaf ? null : createOptions(depth, `${prefix}-${i}`, iterator + 1),
    })
  }

  return options
}
</script>

<style scoped>
.vxp-number-input,
.vxp-cascader {
  max-width: 400px;
}
</style>
