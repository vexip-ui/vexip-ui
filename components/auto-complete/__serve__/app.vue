<template>
  <AutoComplete
    filter
    ignore-case
    placeholder="请输入"
    :options="options"
  ></AutoComplete>
  <br />
  <br />
  <template v-for="state in states" :key="state">
    <AutoComplete :options="options" :state="state"></AutoComplete>
    <br />
    <br />
  </template>
</template>

<script setup lang="ts">
import { AutoComplete } from '..'

const options = [
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项3', value: 3 },
  { label: '选项4', value: 4 },
  { label: '选项5', value: 5 },
  { label: '选项6', value: 6 },
  { label: '选项7', value: 7 },
  { label: '选项8', value: 8 },
  { label: '选项9', value: 9 },
  { label: '选项10', value: 10 },
  { label: '选项11', value: 11 },
  { label: '选项12', value: 12 }
]

const states = ['default', 'success', 'error', 'warning'] as const
</script>

<style lang="scss">
.vxp-auto-complete {
  width: 300px;
}
</style>
