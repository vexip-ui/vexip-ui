<template>
  <AutoComplete v-model:value="value" style="width: 200px;" @on-input="setOptions">
    <Option
      v-for="option in options"
      :key="option"
      :value="option"
      :label="option"
    ></Option>
  </AutoComplete>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref('')
    const options = ref<string[]>([])

    function setOptions(value: string) {
      options.value = value
        ? [
            `${value}@qq.com`,
            `${value}@gmail.com`,
            `${value}@163.com`,
            `${value}@126.com`,
            `${value}@sina.com`
          ]
        : []
    }

    return { value, options, setOptions }
  }
})
</script>
