<template>
  <ConfigProvider :props="providedProps">
    <Form ref="form" :model="formModel" style="max-width: 500px;">
      <FormItem label="Input" prop="input">
        <Input></Input>
      </FormItem>
      <FormItem label="Select" prop="select">
        <Select :options="options"></Select>
      </FormItem>
      <FormItem label="Date" prop="date">
        <DatePicker></DatePicker>
      </FormItem>
      <FormItem action>
        <Button type="warning" :loading="loading" @click="handleValidate">
          验证
        </Button>
      </FormItem>
    </Form>
  </ConfigProvider>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Message } from 'vexip-ui'

import type { Form } from 'vexip-ui'

const providedProps = {
  default: { clearable: true },
  formItem: { required: true }
}

const form = ref<InstanceType<typeof Form>>()
const formModel = reactive({})
const loading = ref(false)

const options = ['Option 1', 'Option 2', 'Option 3']

async function handleValidate() {
  loading.value = true

  const errors = await form.value!.validate()

  if (errors.length) {
    Message.error('Form validation failed')
  } else {
    Message.success('Form validation passed')
  }

  setTimeout(() => {
    loading.value = false
  }, 1000)
}
</script>
