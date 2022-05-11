<template>
  <Select
    v-model:value="value"
    transfer
    clearable
  >
    <OptionGroup
      v-for="group in groups"
      :key="group.label"
      :label="group.label"
      :divided="group.divided"
    >
      <Option
        v-for="(option, index) in group.options"
        :key="index"
        :value="option.value"
      >
        {{ option.label }}
      </Option>
    </OptionGroup>
  </Select>
  <br />
  <p>
    Select Value:
    <br />
    {{ value }}
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Option } from '..'
import { OptionGroup } from '@/components/option-group'
import { Select } from '@/components/select'

const value = ref<string | number>('')

const groups = [
  {
    label: '分组1',
    divided: true,
    options: [
      { label: '选项1', value: 1 },
      { label: '选项2', value: 2 },
      { label: '选项3', value: 3 }
    ]
  },
  {
    label: '分组2',
    divided: true,
    options: [
      { label: '选项4', value: 4 },
      { label: '选项5', value: 5 },
      { label: '选项6', value: 6 },
      { label: '选项7', value: 7 }
    ]
  },
  {
    label: '分组2',
    divided: false,
    options: [
      { label: '选项8', value: 8 },
      { label: '选项9', value: 9 },
      { label: '选项10', value: 10 },
      { label: '选项11', value: 11 },
      { label: '选项12', value: 12 }
    ]
  }
]
</script>

<style lang="scss">
.vxp-select {
  width: 300px;
}
</style>
