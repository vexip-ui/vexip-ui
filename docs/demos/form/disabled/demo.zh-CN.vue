<template>
  <p>
    是否禁用：
    <Switch v-model:value="disabled"></Switch>
  </p>
  <ConfigProvider :props="{ default: { clearable: true } }">
    <Form
      ref="form"
      style="max-width: 500px;"
      :model="formModel"
      :label-width="100"
      :disabled="disabled"
    >
      <FormItem required label="Input" prop="input">
        <Input></Input>
      </FormItem>
      <FormItem required label="Cascader" prop="cascader">
        <Cascader :options="treeOptions"></Cascader>
      </FormItem>
      <FormItem required label="Complete" prop="complete">
        <AutoComplete :options="options"></AutoComplete>
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
      <FormItem required label="Transfer" prop="transfer">
        <Transfer :options="options"></Transfer>
      </FormItem>
      <FormItem required label="Wheel" prop="wheel">
        <Wheel insert-empty :options="options"></Wheel>
      </FormItem>
      <FormItem required label="Upload" prop="upload">
        <Upload allow-drag></Upload>
      </FormItem>
      <FormItem action>
        <Button type="primary" @click="handleSubmit()">
          提交
        </Button>
        <Button @click="handleReset()">
          重置
        </Button>
      </FormItem>
    </Form>
  </ConfigProvider>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

import type { Form } from 'vexip-ui'

const disabled = ref(true)
const formModel = reactive({
  input: '',
  cascader: [],
  date: '',
  time: '',
  number: null,
  complete: '',
  select: '',
  color: '',
  checkbox: [],
  radio: '',
  slider: 0,
  switch: false,
  textarea: '',
  transfer: [],
  wheel: '',
  upload: []
})

const form = ref<InstanceType<typeof Form> | null>(null)

const options = ['选项1', '选项2', '选项3']
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
