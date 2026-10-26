<template>
  <Space>
    <Button id="start-2" type="primary" @click="active = true">
      开始漫游
    </Button>
    <Button id="button-2">
      一个按钮
    </Button>
  </Space>
  <Tour v-model:active="active" :steps="steps"></Tour>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { TourStepOptions } from 'vexip-ui'

const active = ref(false)

const steps: TourStepOptions[] = [
  {
    target: '#start-2',
    title: '开始漫游',
    content: '默认情况漫游提示会在下方',
  },
  {
    target: '#button-2',
    title: '一个按钮',
    content: '你也可以将它方在目标的右边或其他方位',
    placement: 'right',
  },
  {
    title: '居中',
    content: '如果你不指定目标，那么它会在中间',
  },
]
</script>
