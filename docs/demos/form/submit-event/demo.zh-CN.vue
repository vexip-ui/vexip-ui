<template>
  <ConfigProvider :props="providedProps">
    <Form :model="formModel" style="max-width: 500px" @submit="handleSubmit">
      <FormItem label="Input" prop="input">
        <Input></Input>
      </FormItem>
    </Form>
  </ConfigProvider>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const providedProps = {
  default: { clearable: true },
  formItem: { required: true },
}

const formModel = reactive({})

function handleSubmit() {
  console.info('native submit event triggered')
}
</script>
