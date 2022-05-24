<template>
  <AutoComplete
    v-model:value="value"
    style="width: 200px;"
    :options="options"
    @on-input="setOptions"
  ></AutoComplete>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const value = ref('')
    const options = ref<string[]>([])

    function setOptions(value: string) {
      options.value = value ? [value, value + value, value + value + value] : []
    }

    return { value, options, setOptions }
  }
})
</script>
