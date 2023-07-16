<template>
  <Form :model="formModel" style="max-width: 400px">
    <FormItem label="Your Name">
      <FormItem prop="firstName" pure>
        <Input placeholder="First Name" style="margin-right: 10px"></Input>
      </FormItem>
      <FormItem prop="lastName" pure>
        <Input placeholder="Last Name"></Input>
      </FormItem>
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const formModel = reactive({
  // firstName: '',
  // lastName: ''
})
</script>
