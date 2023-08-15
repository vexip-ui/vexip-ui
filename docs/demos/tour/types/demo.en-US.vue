<template>
  <Space>
    <Button id="start-7" type="primary" @click="active = true">
      Start Tour
    </Button>
    <Button id="button-7" type="success">
      A Button
    </Button>
    <Button id="another-button-7" type="error">
      Another Button
    </Button>
  </Space>
  <Tour v-model:active="active" :steps="steps" type="primary"></Tour>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { TourStepOptions } from 'vexip-ui'

const active = ref(false)

const steps: TourStepOptions[] = [
  {
    target: '#start-7',
    title: 'Start Tour',
    content:
      'Although you already know its purpose, I still tell you that after clicking it, you can start tour'
  },
  {
    target: '#button-7',
    title: 'A Button',
    content: 'A button and it just sits there',
    type: 'success'
  },
  {
    target: '#another-button-7',
    title: 'Another Button',
    content: 'Another button and it just sits there too',
    type: 'error'
  }
]
</script>
