<template>
  <Form
    ref="form"
    style="max-width: 300px"
    :model="loginForm"
    hide-label
    action="/components/form"
    target="_blank"
  >
    <FormItem label="username" prop="username">
      <Input placeholder="请输入帐号">
        <template #prefix>
          <Icon><User></User></Icon>
        </template>
      </Input>
    </FormItem>
    <FormItem label="password" prop="password">
      <Input type="password" placeholder="请输入密码">
        <template #prefix>
          <Icon><Lock></Lock></Icon>
        </template>
      </Input>
    </FormItem>
    <FormItem action style="margin-bottom: 5px; text-align: center">
      <FormSubmit type="success" :icon="Check">
        登 陆
      </FormSubmit>
      <FormReset type="warning">
        重 置
      </FormReset>
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

import { Check, Lock, User } from '@vexip-ui/icons'

const loginForm = reactive({
  // username: '',
  // password: ''
})
</script>
