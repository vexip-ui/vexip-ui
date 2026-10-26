<template>
  <ConfigProvider :props="providedProps">
    <Form :model="formModel" style="max-width: 500px">
      <FormItem label="Input" prop="input">
        <Input></Input>
      </FormItem>
      <FormItem label="Cascader" prop="cascader">
        <Cascader :options="treeOptions"></Cascader>
      </FormItem>
      <FormItem label="Select" prop="select">
        <Select :options="options"></Select>
      </FormItem>
      <FormItem label="Date" prop="date">
        <DatePicker></DatePicker>
      </FormItem>
      <FormItem label="Time" prop="time">
        <TimePicker></TimePicker>
      </FormItem>
      <FormItem label="Number" prop="number">
        <NumberInput></NumberInput>
      </FormItem>
      <FormItem label="Color" prop="color">
        <ColorPicker format="hex"></ColorPicker>
      </FormItem>
      <FormItem label="Checkbox" prop="checkbox">
        <CheckboxGroup :options="options"></CheckboxGroup>
      </FormItem>
      <FormItem label="Radio" prop="radio">
        <RadioGroup :options="options"></RadioGroup>
      </FormItem>
      <FormItem label="Slider" prop="slider">
        <Slider></Slider>
      </FormItem>
      <FormItem label="Switch" prop="switch">
        <Switch></Switch>
      </FormItem>
      <FormItem label="Textarea" prop="textarea">
        <Textarea></Textarea>
      </FormItem>
      <FormItem label="Transfer" prop="transfer">
        <Transfer :options="options"></Transfer>
      </FormItem>
      <FormItem label="Wheel" prop="wheel">
        <Wheel insert-empty :options="options"></Wheel>
      </FormItem>
      <FormItem label="Upload" prop="upload">
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
  formItem: { required: true },
}

const formModel = reactive({})

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
      children: isLeaf ? null : createOptions(depth, `${prefix}-${i}`, iterator + 1),
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
