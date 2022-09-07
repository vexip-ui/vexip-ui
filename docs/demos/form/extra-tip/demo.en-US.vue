<template>
  <Form style="max-width: 400px;">
    <FormItem label="Input" prop="input">
      <Input></Input>
    </FormItem>
  </Form>
  <Form label-align="top" style="max-width: 400px;">
    <FormItem label="Select" prop="select">
      <Select :options="options"></Select>
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
const options = ['Option 1', 'Option 2', 'Option 3']
</script>
