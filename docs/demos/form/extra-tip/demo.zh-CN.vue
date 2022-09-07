<template>
  <Form style="max-width: 400px;" label-suffix=":">
    <FormItem label="Input" prop="input" help="一些帮助信息">
      <Input></Input>
    </FormItem>
    <FormItem label="Select" prop="select">
      <Select :options="options"></Select>
    </FormItem>
  </Form>
  <Form label-align="top" style="max-width: 400px;">
    <FormItem label="Select" prop="select">
      <Select :options="options"></Select>
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
const options = ['选项1', '选项2', '选项3']
</script>
