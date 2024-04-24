<template>
  <ConfigProvider :props="providedProps">
    <Form :model="formModel" style="max-width: 500px">
      <FormItem label="Input" prop="input" default-value="vexip">
        <Input></Input>
      </FormItem>
      <FormItem label="Cascader" prop="cascader" :default-value="['Op-2', 'Op-2-3', 'Op-2-3-2']">
        <Cascader :options="treeOptions"></Cascader>
      </FormItem>
      <FormItem label="Select" prop="select" default-value="Option 2">
        <Select :options="options"></Select>
      </FormItem>
      <FormItem label="Date" prop="date" :default-value="new Date()">
        <DatePicker></DatePicker>
      </FormItem>
      <FormItem label="Time" prop="time" default-value="20:00:00">
        <TimePicker></TimePicker>
      </FormItem>
      <FormItem label="Number" prop="number" :default-value="666">
        <NumberInput></NumberInput>
      </FormItem>
      <FormItem label="Color" prop="color" default-value="#339af0">
        <ColorPicker format="hex"></ColorPicker>
      </FormItem>
      <FormItem label="Checkbox" prop="checkbox" :default-value="['Option 3']">
        <CheckboxGroup :options="options"></CheckboxGroup>
      </FormItem>
      <FormItem label="Radio" prop="radio" default-value="Option 3">
        <RadioGroup :options="options"></RadioGroup>
      </FormItem>
      <FormItem label="Slider" prop="slider" :default-value="58">
        <Slider></Slider>
      </FormItem>
      <FormItem label="Switch" prop="switch" :default-value="true">
        <Switch></Switch>
      </FormItem>
      <FormItem label="Textarea" prop="textarea" default-value="Some content">
        <Textarea></Textarea>
      </FormItem>
      <FormItem label="Transfer" prop="transfer" :default-value="['Option 1']">
        <Transfer :options="options"></Transfer>
      </FormItem>
      <FormItem label="Wheel" prop="wheel" default-value="Option 2">
        <Wheel insert-empty :options="options"></Wheel>
      </FormItem>
      <FormItem label="Upload" prop="upload" :default-value="defaultFiles">
        <Upload allow-drag></Upload>
      </FormItem>
      <FormItem action>
        <FormSubmit @submit="handleSubmit" @error="handleError"></FormSubmit>
        <FormReset></FormReset>
      </FormItem>
    </Form>
  </ConfigProvider>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const providedProps = {
  default: { clearable: true },
  formItem: { required: true }
}

const formModel = reactive({})

const options = ['Option 1', 'Option 2', 'Option 3']
const treeOptions = createOptions(3)

const defaultFiles = [
  {
    name: 'vexip-ui.svg',
    url: 'https://www.vexipui.com/vexip-ui.svg',
    status: 'success'
  }
]

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
  console.info('validation passed')
}

function handleError(errors: string[]) {
  console.error(errors)
}
</script>
