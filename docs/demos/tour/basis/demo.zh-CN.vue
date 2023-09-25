<template>
  <Space>
    <Button id="start-1" type="primary" @click="active = true">
      开始漫游
    </Button>
    <Button id="button-1">
      一个按钮
    </Button>
    <Button id="another-button-1">
      另一个按钮
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
    target: '#start-1',
    title: '开始漫游',
    content: '虽然你已经知道了它的用途，但还是告诉你，点了它之后就可以开始漫游了'
  },
  {
    target: '#button-1',
    title: '一个按钮',
    content: '一个按钮它就静静地在那儿'
  },
  {
    target: '#another-button-1',
    title: '另一个按钮',
    content: '另一个按钮它也静静地在那儿'
  }
]
</script>
