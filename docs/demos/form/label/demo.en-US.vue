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
  { label: 'left', content: 'Left' },
  { label: 'right', content: 'Right' },
  { label: 'top', content: 'Top' }
]

const formModel = reactive({})

const options = ['Option 1', 'Option 2', 'Option 3']
</script>
