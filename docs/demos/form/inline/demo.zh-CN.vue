<template>
  <Form :model="formModel" inline>
    <FormItem label="Input" prop="input">
      <Input></Input>
    </FormItem>
    <FormItem label="Select" prop="select">
      <Select :options="options"></Select>
    </FormItem>
    <FormItem action>
      <Button type="primary">
        提交
      </Button>
    </FormItem>
  </Form>
  <br />
  <Form :model="formModel" inline label-align="top">
    <FormItem label="Input" prop="input">
      <Input></Input>
    </FormItem>
    <FormItem label="Select" prop="select">
      <Select :options="options"></Select>
    </FormItem>
    <FormItem action>
      <FormSubmit></FormSubmit>
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const formModel = reactive({})

const options = ['选项1', '选项2', '选项3']
</script>

<style scoped>
.vxp-form--inline:deep(.vxp-form__control:not(.vxp-form__control--action)) {
  min-width: 120px;
}
</style>
