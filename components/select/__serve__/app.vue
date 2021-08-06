<template>
  <Select
    v-model:value="value"
    transfer
    clearable
    :options="options"
  ></Select>
  <br />
  <p>
    Select Value:
    <br />
    {{ value }}
  </p>
  <br />
  <Select
    v-model:value="values"
    transfer
    multiple
    clearable
    option-check
    :options="options"
  ></Select>
  <br />
  <br />
  <Select clearable>
    <Option>选项1</Option>
    <Option>选项2</Option>
    <Option>选项3</Option>
  </Select>
  <br />
  <br />
  <Select></Select>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Option } from '@/components/option'
import { Select } from '..'

export default defineComponent({
  name: 'App',
  components: {
    Option,
    Select
  },
  setup() {
    const value = ref<string | number>('')
    const value2 = ref<string | number>('')
    const values = ref<(string | number)[]>([])

    return {
      value,
      value2,
      values,
      options: [
        { label: '选项1', value: 'a' },
        { label: '选项2', value: 2 },
        { label: '选项3', value: 3 },
        { label: '选项4', value: 4 },
        { label: '选项5', value: 5 },
        { label: '选项6', value: 6 },
        { label: '选项7', value: 7 },
        { label: '选项8', value: 8 },
        { label: '选项9', value: 9 },
        { label: '选项10', value: 10 },
        { label: '选项11', value: 11 },
        { label: '选项12', value: 12 }
      ]
    }
  }
})
</script>

<style lang="scss">
.vxp-select {
  width: 300px;
}
</style>
