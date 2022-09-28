<template>
  <Select v-model:value="value" :options="options" :key-config="keyConfig"></Select>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<number>()

const keyConfig = {
  label: 'customLabel',
  value: 'customValue'
}

const options = [
  {
    customLabel: '选项1',
    customValue: 1
  },
  {
    customLabel: '选项2',
    customValue: 2
  },
  {
    customLabel: '选项3',
    customValue: 3
  }
]
</script>

<style scoped>
.vxp-select {
  max-width: 400px;
}
</style>
