<template>
  <Space>
    <Button id="start-4" type="primary" @click="active = true">
      Start Tour
    </Button>
    <Button id="button-4">
      A Button
    </Button>
    <Select ref="select" style="width: 300px"></Select>
  </Space>
  <Tour v-model:active="active">
    <TourStep
      target="#start-4"
      title="Start Tour"
      content="Although you already know its purpose, I still tell you that after clicking it, you can start tour"
    ></TourStep>
    <TourStep
      target="#button-4"
      title="A Button"
      content="A button and it just sits there"
    ></TourStep>
    <TourStep
      :target="select"
      title="Empty Select"
      content="A selector without any option, so you can select nothing"
    ></TourStep>
  </Tour>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { SelectExposed } from 'vexip-ui'

const active = ref(false)
const select = ref<SelectExposed>()
</script>
