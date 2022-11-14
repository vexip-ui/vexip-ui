<template>
  <Form style="max-width: 400px;" label-suffix=":">
    <FormItem label="Input" prop="input" help="Some help tips">
      <Input></Input>
    </FormItem>
  </Form>
  <Form label-align="top" style="max-width: 400px;">
    <FormItem label="Select" prop="select">
      <Select :options="options"></Select>
      <template #help>
        Some help tips via slot
      </template>
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
const options = ['Option 1', 'Option 2', 'Option 3']
</script>
