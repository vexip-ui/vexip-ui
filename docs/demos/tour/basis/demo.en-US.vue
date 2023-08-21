<template>
  <Space>
    <Button id="start-1" type="primary" @click="active = true">
      Start Tour
    </Button>
    <Button id="button-1">
      A Button
    </Button>
    <Button id="another-button-1">
      Another Button
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
    title: 'Start Tour',
    content:
      'Although you already know its purpose, I still tell you that after clicking it, you can start tour'
  },
  {
    target: '#button-1',
    title: 'A Button',
    content: 'A button and it just sits there'
  },
  {
    target: '#another-button-1',
    title: 'Another Button',
    content: 'Another button and it just sits there too'
  }
]
</script>
