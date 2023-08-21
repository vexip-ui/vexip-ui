<template>
  <p>
    Sign Type:
    <RadioGroup v-model:value="signType" button :options="signTypes"></RadioGroup>
  </p>
  <Space>
    <Button id="start-3" type="primary" @click="active = true">
      Start Tour
    </Button>
    <Button id="button-3">
      A Button
    </Button>
    <Select ref="select" style="width: 300px"></Select>
  </Space>
  <Tour v-model:active="active">
    <TourStep
      target="#start-3"
      title="Start Tour"
      content="Although you already know its purpose, I still tell you that after clicking it, you can start tour"
    ></TourStep>
    <TourStep
      target="#button-3"
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

import type { SelectExposed, TourSignType } from 'vexip-ui'

const signTypes: TourSignType[] = ['dot', 'bar', 'count']
const signType = ref(signTypes[0])

const active = ref(false)
const select = ref<SelectExposed>()
</script>
