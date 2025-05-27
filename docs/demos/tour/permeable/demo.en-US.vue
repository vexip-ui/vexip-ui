<template>
  <Space>
    <Button id="start-6" type="primary" @click="active = true">
      Start Tour
    </Button>
    <Button id="button-6">
      A Button
    </Button>
    <Button id="another-button-6">
      Another Button
    </Button>
  </Space>
  <Tour v-model:active="active" :steps="steps" permeable></Tour>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { TourStepOptions } from 'vexip-ui'

const active = ref(false)

const steps: TourStepOptions[] = [
  {
    target: '#start-6',
    title: 'Start Tour',
    content:
      'Although you already know its purpose, I still tell you that after clicking it, you can start tour',
  },
  {
    target: '#button-6',
    title: 'A Button',
    content: 'A button and it just sits there',
  },
  {
    target: '#another-button-6',
    title: 'Another Button',
    content: 'Another button and it just sits there too',
  },
]
</script>
