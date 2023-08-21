<template>
  <p>
    Sign Type:
    <RadioGroup v-model:value="signType" button :options="signTypes"></RadioGroup>
  </p>
  <Space>
    <Button id="start-3" type="primary" @click="active = true">
      开始漫游
    </Button>
    <Button id="button-3">
      一个按钮
    </Button>
    <Select ref="select" style="width: 300px"></Select>
  </Space>
  <Tour v-model:active="active" :sign-type="signType">
    <TourStep
      target="#start-3"
      title="开始漫游"
      content="虽然你已经知道了它的用途，但还是告诉你，点了它之后就可以开始漫游了"
    ></TourStep>
    <TourStep target="#button-3" title="一个按钮" content="一个按钮它就静静地在那儿"></TourStep>
    <TourStep
      :target="select"
      title="空选择器"
      content="一个啥都没有的选择器，于是你无法选择任何东西"
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
