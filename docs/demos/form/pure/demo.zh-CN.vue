<template>
  <Form :model="formModel" style="max-width: 400px;">
    <FormItem label="你的名字">
      <FormItem prop="firstName" pure>
        <Input placeholder="姓啥" style="margin-right: 10px;"></Input>
      </FormItem>
      <FormItem prop="lastName" pure>
        <Input placeholder="名啥"></Input>
      </FormItem>
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const formModel = reactive({
  firstName: '',
  lastName: ''
})
</script>
