<template>
  <Cascader
    v-model:value="values"
    :options="options"
    multiple
    clearable
    no-cascaded
  ></Cascader>
  <p>
    Multiple Values:
    {{ values }}
  </p>
  <Cascader
    v-model:value="value"
    :options="options"
    clearable
    no-cascaded
  ></Cascader>
  <p>
    Single Value:
    {{ value }}
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const values = ref([['Op-2'], ['Op-2', 'Op-2-5'], ['Op-2', 'Op-2-5', 'Op-2-5-3']])
const value = ref(['Op-2', 'Op-2-5'])
const options = createOptions(3)

function createOptions(depth: number, prefix = 'Op', iterator = 1) {
  const options: Array<Record<string, any>> = []
  const isLeaf = iterator === depth

  for (let i = 1; i <= 10; ++i) {
    options.push({
      value: `${prefix}-${i}`,
      label: `${prefix}-${i}`,
      disabled: i % 4 === 0,
      children: isLeaf ? null : createOptions(depth, `${prefix}-${i}`, iterator + 1)
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
