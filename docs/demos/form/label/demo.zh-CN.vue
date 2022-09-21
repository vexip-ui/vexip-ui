<template>
  <RadioGroup v-model:value="currentAlign" button :options="aligns"></RadioGroup>
  <br />
  <br />
  <Form :model="formModel" :label-align="currentAlign" style="max-width: 400px;">
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

import type { FormLabelAlign } from 'vexip-ui'

const currentAlign = ref<FormLabelAlign>('right')
const aligns: Array<{ label: FormLabelAlign, content: string }> = [
  { label: 'left', content: '左对齐' },
  { label: 'right', content: '右对齐' },
  { label: 'top', content: '上对齐' }
]

const formModel = reactive({})

const options = ['选项1', '选项2', '选项3']
</script>
