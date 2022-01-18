<template>
  <Form :model="model" action="/test">
    <FormItem prop="input" label="Input">
      <Input v-model:value="model.input"></Input>
    </FormItem>
    <FormItem action>
      <FormSubmit></FormSubmit>
      <FormReset></FormReset>
    </FormItem>
  </Form>
  <div>
    Form Model:
    <br />
    {{ model }}
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { Input } from '@/components/input'
import { Form } from '..'
import { FormItem } from '@/components/form-item'
import { FormSubmit } from '@/components/form-submit'
import { FormReset } from '@/components/form-reset'

export default defineComponent({
  name: 'App',
  components: {
    Input,
    Form,
    FormItem,
    FormSubmit,
    FormReset
  },
  setup() {
    const model = reactive({
      input: ''
    })

    return {
      model
    }
  }
})
</script>

<style lang="scss">
.vxp-form {
  width: 500px;
}
</style>
