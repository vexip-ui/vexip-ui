<template>
  <Form :model="model">
    <FormItem prop="Input" label="Input">
      <Input v-model:value="model.input"></Input>
    </FormItem>
  </Form>
  <div>
    Form Model:
    <br />
    {{ model }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Input } from '@/components/input'
import Form from '../form.vue'
import FormItem from '../form-item.vue'

export default defineComponent({
  name: 'App',
  components: {
    Input,
    Form,
    FormItem
  },
  setup() {
    const model = ref({
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
