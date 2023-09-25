<template>
  <Space>
    <Button id="start-5" type="primary" @click="active = true">
      开始漫游
    </Button>
    <Button id="button-5">
      一个按钮
    </Button>
    <Select ref="select" style="width: 300px"></Select>
  </Space>
  <Tour v-model:active="active">
    <TourStep
      target="#start-5"
      title="开始漫游"
      content="虽然你已经知道了它的用途，但还是告诉你，点了它之后就可以开始漫游了"
    ></TourStep>
    <TourStep target="#button-5" title="一个按钮" content="一个按钮它就静静地在那儿"></TourStep>
    <TourStep
      :target="select"
      title="空选择器"
      content="一个啥都没有的选择器，于是你无法选择任何东西"
    ></TourStep>

    <template #title="{ step, index }">
      {{ `第 ${index + 1} 步、${step.title}` }}
    </template>
    <template #body="{ step }">
      <div style="color: var(--vxp-color-primary-base)">
        {{ step.content }}
      </div>
    </template>
    <template #sign="{ index }">
      {{ index === 2 ? '即将完成' : `还有 ${2 - index} 步` }}
    </template>
  </Tour>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { SelectExposed } from 'vexip-ui'

const active = ref(false)
const select = ref<SelectExposed>()
</script>
