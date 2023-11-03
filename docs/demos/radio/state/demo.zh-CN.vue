<template>
  <p style="display: flex; align-items: center">
    <span style="margin-inline-end: 10px">Shape:</span>
    <RadioGroup v-model:value="shape" :options="shapes" shape="button-group"></RadioGroup>
  </p>
  <Space vertical>
    <RadioGroup
      v-for="state in states"
      :key="state"
      value="上海"
      :shape="shape"
      :state="state"
      :options="options"
    ></RadioGroup>
  </Space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { RadioGroupShape } from 'vexip-ui'

const shapes: RadioGroupShape[] = ['default', 'border', 'button', 'button-group']
const shape = ref(shapes[0])

const states = ['default', 'success', 'error', 'warning'] as const
const options = ['北京', '上海', '广州', '深圳']
</script>
