<template>
  <RadioGroup v-model:value="currentSize" button :options="sizes"></RadioGroup>
  <br />
  <br />
  <Form
    :model="formModel"
    :size="currentSize"
    label-align="top"
    style="max-width: 400px;"
  >
    <FormItem label="Input" prop="input">
      <Input></Input>
    </FormItem>
    <FormItem label="Select" prop="select">
      <Select :options="options"></Select>
    </FormItem>
    <FormItem label="Checkbox" prop="checkbox">
      <CheckboxGroup :options="options"></CheckboxGroup>
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

import type { ComponentSize } from 'vexip-ui'

const currentSize = ref<ComponentSize>('default')
const sizes: Array<{ label: ComponentSize, content: string }> = [
  { label: 'small', content: 'Small' },
  { label: 'default', content: 'Default' },
  { label: 'large', content: 'Large' }
]

const formModel = reactive({
  input: '',
  select: '',
  checkbox: []
})

const options = ['选项1', '选项2', '选项3']
</script>
