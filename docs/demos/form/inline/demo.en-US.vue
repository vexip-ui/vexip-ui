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
        Submit
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
      <Button type="primary">
        Submit
      </Button>
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const formModel = reactive({
  input: '',
  select: ''
})

const options = ['Option 1', 'Option 2', 'Option 3']
</script>

<style scoped>
.vxp-form--inline:deep(.vxp-form__control:not(.vxp-form__control--action)) {
  min-width: 120px;
}
</style>
