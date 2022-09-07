<template>
  <Form :model="formModel" label-align="top" style="max-width: 400px;">
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
import { reactive } from 'vue'

const formModel = reactive({
  input: '',
  select: '',
  checkbox: []
})

const options = ['选项1', '选项2', '选项3']
</script>
