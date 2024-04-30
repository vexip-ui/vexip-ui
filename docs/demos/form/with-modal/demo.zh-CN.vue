<template>
  <RadioGroup v-model:value="currentAlign" button :options="aligns"></RadioGroup>
  <br />
  <br />
  <Button type="primary" @click="active = !active">
    打开
  </Button>
  <Modal
    v-model:active="active"
    auto-remove
    title="模态表单"
    :on-before-close="handleSubmit"
  >
    <Form
      ref="from"
      :model="formModel"
      :label-align="currentAlign"
      style="max-width: 400px"
    >
      <FormItem label="Input" prop="input" required>
        <Input></Input>
      </FormItem>
      <FormItem label="Select" prop="select">
        <Select :options="options"></Select>
      </FormItem>
      <FormItem label="Checkbox" prop="checkbox" style="margin-bottom: 0">
        <CheckboxGroup :options="options"></CheckboxGroup>
      </FormItem>
    </Form>
  </Modal>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

import { Message } from 'vexip-ui'

import type { FormExposed, FormLabelAlign } from 'vexip-ui'

const currentAlign = ref<FormLabelAlign>('right')
const aligns: Array<{ label: FormLabelAlign, content: string }> = [
  { label: 'left', content: '左对齐' },
  { label: 'right', content: '右对齐' },
  { label: 'top', content: '上对齐' }
]

const formModel = reactive({})
const active = ref(false)
const loading = ref(false)

const options = ['选项1', '选项2', '选项3']

const from = ref<FormExposed>()

async function handleSubmit() {
  if (!from.value) return

  loading.value = true

  const errors = await from.value.validate()

  loading.value = false

  if (!errors.length) {
    Message.success('提交成功')
  } else {
    Message.error(errors[0])

    return false
  }
}
</script>
