<template>
  <Checkbox v-model:checked="checked">
    Checkbox
  </Checkbox>
  <br />
  <p style="margin-top: 10px;">
    checked: {{ checked }}
  </p>
  <CheckboxGroup v-model:values="values">
    <Checkbox control>
      全选
    </Checkbox>
    <Checkbox v-for="item in items" :key="item" :label="item"></Checkbox>
  </CheckboxGroup>
  <p>
    Checkbox Value:
    <br />
    {{ values }}
  </p>
  <CheckboxGroup v-model:values="values" vertical>
    <Checkbox control>
      全选
    </Checkbox>
    <Checkbox v-for="item in items" :key="item" :label="item"></Checkbox>
  </CheckboxGroup>
  <br />
  <br />
  <template v-for="state in states" :key="state">
    <CheckboxGroup :values="[items[0], items[3]]">
      <Checkbox
        v-for="(item, index) in items"
        :key="item"
        :state="state"
        :label="item"
        :disabled="index === 2 || index === 3"
        :control="index === 1"
        :partial="index === 1"
      ></Checkbox>
    </CheckboxGroup>
    <br />
  </template>
  <br />
  <template v-for="state in states" :key="state">
    <CheckboxGroup :values="[items[0], items[3]]">
      <Checkbox
        v-for="(item, index) in items"
        :key="item"
        border
        :state="state"
        :label="item"
        :disabled="index === 2 || index === 3"
        :control="index === 1"
        :partial="index === 1"
      ></Checkbox>
    </CheckboxGroup>
    <br />
    <br />
  </template>
  <br />
  <template v-for="size in sizes" :key="size">
    <CheckboxGroup :values="[items[0], items[3]]">
      <Checkbox
        v-for="(item, index) in items"
        :key="item"
        :label="item"
        :size="size"
        :disabled="index === 2 || index === 3"
        :control="index === 1"
        :partial="index === 1"
      ></Checkbox>
    </CheckboxGroup>
    <br />
  </template>
  <br />
  <template v-for="size in sizes" :key="size">
    <CheckboxGroup :values="[items[0], items[3]]">
      <Checkbox
        v-for="(item, index) in items"
        :key="item"
        border
        :label="item"
        :size="size"
        :disabled="index === 2 || index === 3"
        :control="index === 1"
        :partial="index === 1"
      ></Checkbox>
    </CheckboxGroup>
    <br />
    <br />
  </template>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from '..'
import { CheckboxGroup } from '@/components/checkbox-group'

const checked = ref(false)
const values = ref<string[]>(['广州'])
const items = ['北京', '上海', '广州', '深圳']
const states = ['default', 'success', 'error', 'warning'] as const
const sizes = ['small', 'default', 'large'] as const
</script>
