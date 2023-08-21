<template>
  <Space>
    <Button id="start-2" type="primary" @click="active = true">
      Start Tour
    </Button>
    <Button id="button-2">
      A Button
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
    title: 'Start Tour',
    content: 'By default the tour tip will be below'
  },
  {
    target: '#button-2',
    title: 'A Button',
    content: 'You can also place it to the right of the target or other position',
    placement: 'right'
  },
  {
    title: 'Center',
    content: "If you don't specify a target then it will be in the center"
  }
]
</script>
