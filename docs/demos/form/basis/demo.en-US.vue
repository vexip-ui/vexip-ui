<template>
  <ConfigProvider :props="{ default: { clearable: true } }">
    <Form
      ref="form"
      style="width: 500px;"
      :model="formModel"
      :label-width="100"
    >
      <FormItem required label="Input" prop="input">
        <Input></Input>
      </FormItem>
      <FormItem required label="Cascader" prop="cascader">
        <Cascader :options="treeOptions"></Cascader>
      </FormItem>
      <FormItem required label="Select" prop="select">
        <Select :options="options"></Select>
      </FormItem>
      <FormItem required label="Date" prop="date">
        <DatePicker></DatePicker>
      </FormItem>
      <FormItem required label="Time" prop="time">
        <TimePicker></TimePicker>
      </FormItem>
      <FormItem required label="Number" prop="number">
        <NumberInput></NumberInput>
      </FormItem>
      <FormItem required label="Color" prop="color">
        <ColorPicker format="hex"></ColorPicker>
      </FormItem>
      <FormItem required label="Checkbox" prop="checkbox">
        <CheckboxGroup :options="options"></CheckboxGroup>
      </FormItem>
      <FormItem required label="Radio" prop="radio">
        <RadioGroup :options="options"></RadioGroup>
      </FormItem>
      <FormItem required label="Slider" prop="slider">
        <Slider></Slider>
      </FormItem>
      <FormItem required label="Switch" prop="switch">
        <Switch></Switch>
      </FormItem>
      <FormItem required label="Textarea" prop="textarea">
        <Textarea></Textarea>
      </FormItem>
      <FormItem required label="Wheel" prop="wheel">
        <Wheel insert-empty :options="options"></Wheel>
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
  </ConfigProvider>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

import type { Form } from 'vexip-ui'

const formModel = reactive({
  input: '',
  cascader: [],
  date: '',
  time: '',
  number: null,
  select: '',
  color: '',
  checkbox: [],
  radio: '',
  slider: 0,
  switch: false,
  textarea: '',
  wheel: ''
})

const form = ref<InstanceType<typeof Form> | null>(null)

const options = ['Option 1', 'Option 2', 'Option 3']
const treeOptions = createOptions(3)

function createOptions(depth: number, prefix = 'Op', iterator = 1) {
  const options: Array<Record<string, any>> = []
  const isLeaf = iterator === depth

  for (let i = 1; i <= 10; ++i) {
    options.push({
      value: `${prefix}-${i}`,
      label: `${prefix}-${i}`,
      disabled: i % 4 === 0,
      children: isLeaf ? null : createOptions(depth, `${prefix}-${i}`, iterator + 1)
    })
  }

  return options
}

function handleSubmit() {
  form.value?.validate()
}

function handleReset() {
  form.value?.reset()
}
</script>
