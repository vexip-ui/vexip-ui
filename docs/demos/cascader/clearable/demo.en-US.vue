<template>
  <Cascader :value="value" :options="options" clearable></Cascader>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(['Op-2', 'Op-2-5', 'Op-2-5-3'])
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
.vxp-cascader {
  max-width: 400px;
}
</style>
