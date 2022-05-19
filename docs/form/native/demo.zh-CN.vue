<template>
  <Form
    ref="form"
    style="width: 300px;"
    :model="loginForm"
    hide-label
    action="/components/form"
    target="_blank"
  >
    <FormItem label="username" prop="username">
      <Input v-model:value="loginForm.username" placeholder="请输入帐号">
        <template #prefix>
          <Icon name="user"></Icon>
        </template>
      </Input>
    </FormItem>
    <FormItem label="password" prop="password">
      <Input v-model:value="loginForm.password" type="password" placeholder="请输入密码">
        <template #prefix>
          <Icon name="lock"></Icon>
        </template>
      </Input>
    </FormItem>
    <FormItem style="margin-bottom: 5px; text-align: center;">
      <FormSubmit type="success" icon="check">
        登 陆
      </FormSubmit>
      <FormReset type="warning">
        重 置
      </FormReset>
    </FormItem>
  </Form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const loginForm = reactive({
      username: '',
      password: ''
    })

    return {
      loginForm
    }
  }
})
</script>
