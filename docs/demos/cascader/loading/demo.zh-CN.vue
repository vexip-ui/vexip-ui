<template>
  <Cascader :loading="loading" placeholder="加载中可编辑" :options="options"></Cascader>
  <br />
  <br />
  <Cascader
    :loading="loading"
    loading-lock
    placeholder="加载中不可编辑"
    :options="options"
  ></Cascader>
  <p>
    加载中：
    <Switch v-model:value="loading"></Switch>
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
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
