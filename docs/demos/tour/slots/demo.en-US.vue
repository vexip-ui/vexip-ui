<template>
  <Space>
    <Button id="start-5" type="primary" @click="active = true">
      Start Tour
    </Button>
    <Button id="button-5">
      A Button
    </Button>
    <Select ref="select" style="width: 300px"></Select>
  </Space>
  <Tour v-model:active="active">
    <TourStep
      target="#start-5"
      title="Start Tour"
      content="Although you already know its purpose, I still tell you that after clicking it, you can start tour"
    ></TourStep>
    <TourStep
      target="#button-5"
      title="A Button"
      content="A button and it just sits there"
    ></TourStep>
    <TourStep
      :target="select"
      title="Empty Select"
      content="A selector without any option, so you can select nothing"
    ></TourStep>

    <template #title="{ step, index }">
      {{ `Step ${index + 1}. ${step.title}` }}
    </template>
    <template #body="{ step }">
      <div style="color: var(--vxp-color-primary-base)">
        {{ step.content }}
      </div>
    </template>
    <template #sign="{ index }">
      {{ index === 2 ? 'Will be done' : `${2 - index} step remaining` }}
    </template>
  </Tour>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { SelectExposed } from 'vexip-ui'

const active = ref(false)
const select = ref<SelectExposed>()
</script>
