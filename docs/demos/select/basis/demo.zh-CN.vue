<template>
  <div>
    <Select v-model:value="value1">
      <Option>选项1</Option>
      <Option>选项2</Option>
      <Option>选项3</Option>
    </Select>
    <br />
    <br />
    <Select v-model:value="value2">
      <Option
        v-for="(item, index) in options"
        :key="index"
        :value="item.value"
      >
        {{ item.label }}
      </Option>
    </Select>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value1 = ref('')
    const value2 = ref('')

    return {
      value1,
      value2,
      options: [
        {
          label: '选项1',
          value: 1
        },
        {
          label: '选项2',
          value: 2
        },
        {
          label: '选项3',
          value: 3
        }
      ]
    }
  }
})
</script>
