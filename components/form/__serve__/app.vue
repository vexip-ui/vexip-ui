<template>
  <Form
    ref="form"
    style="width: 500px;"
    :model="model"
    :label-width="100"
  >
    <FormItem required label="Input" prop="input">
      <Input v-model:value="model.input"></Input>
    </FormItem>
    <FormItem required label="Select" prop="select">
      <Select v-model:value="model.select">
        <Option>选项1</Option>
        <Option>选项2</Option>
        <Option>选项3</Option>
      </Select>
    </FormItem>
    <FormItem required label="Date" prop="date">
      <DatePicker v-model:value="model.date" clearable></DatePicker>
    </FormItem>
    <FormItem required label="Time" prop="time">
      <TimePicker v-model:value="model.time"></TimePicker>
    </FormItem>
    <FormItem required label="Number" prop="number">
      <NumberInput v-model:value="model.number"></NumberInput>
    </FormItem>
    <FormItem required label="Color" prop="color">
      <ColorPicker v-model:value="model.color"></ColorPicker>
    </FormItem>
    <FormItem required label="Checkbox" prop="checkbox">
      <CheckboxGroup v-model:values="model.checkbox">
        <Checkbox label="选项1" value="1"></Checkbox>
        <Checkbox label="选项2" value="2"></Checkbox>
        <Checkbox label="选项3" value="3"></Checkbox>
      </CheckboxGroup>
    </FormItem>
    <FormItem required label="Radio" prop="radio">
      <RadioGroup v-model:value="model.radio">
        <Radio label="选项1"></Radio>
        <Radio label="选项2"></Radio>
        <Radio label="选项3"></Radio>
      </RadioGroup>
    </FormItem>
    <FormItem required label="Textarea" prop="textarea">
      <Textarea v-model:value="model.textarea"></Textarea>
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

<script setup lang="ts">
import { reactive } from 'vue'

import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { Option } from '@/components/option'
import { DatePicker } from '@/components/date-picker'
import { TimePicker } from '@/components/time-picker'
import { NumberInput } from '@/components/number-input'
import { ColorPicker } from '@/components/color-picker'
import { Checkbox } from '@/components/checkbox'
import { CheckboxGroup } from '@/components/checkbox-group'
import { Radio } from '@/components/radio'
import { RadioGroup } from '@/components/radio-group'
import { Textarea } from '@/components/textarea'

import { Form } from '..'
import { FormItem } from '@/components/form-item'
import { FormSubmit } from '@/components/form-submit'
import { FormReset } from '@/components/form-reset'

const model = reactive({
  input: '',
  select: '',
  date: '',
  time: '',
  number: null,
  color: '',
  checkbox: [],
  radio: '',
  textarea: ''
})
</script>

<style lang="scss">
.vxp-form {
  width: 500px;
}
</style>
