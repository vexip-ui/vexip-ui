<template>
  <Space vertical>
    <Select v-model:value="value" :prefix="User" :options="options"></Select>
    <Select v-model:value="value" :suffix="ArrowUp" :options="options"></Select>
    <Select
      v-model:value="value"
      :suffix="ArrowUp"
      static-suffix
      :options="options"
    ></Select>
    <Select v-model:value="value" :options="options" no-suffix></Select>
  </Space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { ArrowUp, User } from '@vexip-ui/icons'

const value = ref('')
const options = ['选项1', '选项2', '选项3']
</script>

<style scoped>
.vxp-select {
  max-width: 400px;
}
</style>
