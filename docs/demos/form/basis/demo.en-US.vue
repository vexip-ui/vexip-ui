<template>
  <Form
    ref="form"
    style="width: 500px;"
    :model="formModel"
    :label-width="100"
  >
    <FormItem required label="Input" prop="input">
      <Input v-model:value="formModel.input"></Input>
    </FormItem>
    <FormItem required label="Select" prop="select">
      <Select v-model:value="formModel.select">
        <Option>Option 1</Option>
        <Option>Option 2</Option>
        <Option>Option 3</Option>
      </Select>
    </FormItem>
    <FormItem required label="Date" prop="date">
      <DatePicker v-model:value="formModel.date" clearable></DatePicker>
    </FormItem>
    <FormItem required label="Time" prop="time">
      <TimePicker v-model:value="formModel.time"></TimePicker>
    </FormItem>
    <FormItem required label="Number" prop="number">
      <NumberInput v-model:value="formModel.number"></NumberInput>
    </FormItem>
    <FormItem required label="Color" prop="color">
      <ColorPicker v-model:value="formModel.color"></ColorPicker>
    </FormItem>
    <FormItem required label="Checkbox" prop="checkbox">
      <CheckboxGroup v-model:values="formModel.checkbox">
        <Checkbox label="Option 1" value="1"></Checkbox>
        <Checkbox label="Option 2" value="2"></Checkbox>
        <Checkbox label="Option 3" value="3"></Checkbox>
      </CheckboxGroup>
    </FormItem>
    <FormItem required label="Radio" prop="radio">
      <RadioGroup v-model:value="formModel.radio">
        <Radio label="Option 1"></Radio>
        <Radio label="Option 2"></Radio>
        <Radio label="Option 3"></Radio>
      </RadioGroup>
    </FormItem>
    <FormItem required label="Textarea" prop="textarea">
      <Textarea v-model:value="formModel.textarea"></Textarea>
    </FormItem>
    <FormItem action>
      <Button type="primary" @click="handleSubmit()">
        Submit
      </Button>
      <Button @click="handleReset()">
        Reset
      </Button>
    </FormItem>
  </Form>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'

import type { Form } from 'vexip-ui'

export default defineComponent({
  setup() {
    const formModel = reactive({
      input: '',
      date: '',
      time: '',
      number: null,
      select: '',
      color: '',
      checkbox: [],
      radio: '',
      textarea: ''
    })

    const form = ref<InstanceType<typeof Form> | null>(null)

    function handleSubmit() {
      form.value?.validate()
    }

    function handleReset() {
      form.value?.reset()
    }

    return {
      formModel,
      form,
      handleSubmit,
      handleReset
    }
  }
})
</script>
