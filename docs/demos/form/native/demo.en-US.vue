<template>
  <Form
    ref="form"
    style="max-width: 300px;"
    :model="loginForm"
    hide-label
    action="/components/form"
    target="_blank"
  >
    <FormItem label="username" prop="username">
      <Input placeholder="Place input account">
        <template #prefix>
          <Icon><User></User></Icon>
        </template>
      </Input>
    </FormItem>
    <FormItem label="password" prop="password">
      <Input type="password" placeholder="Place input password">
        <template #prefix>
          <Icon><Lock></Lock></Icon>
        </template>
      </Input>
    </FormItem>
    <FormItem style="margin-bottom: 5px; text-align: center;">
      <FormSubmit type="success" :icon="Check">
        Login
      </FormSubmit>
      <FormReset type="warning">
        Reset
      </FormReset>
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Lock, User, Check } from '@vexip-ui/icons'

const loginForm = reactive({
  username: '',
  password: ''
})
</script>
