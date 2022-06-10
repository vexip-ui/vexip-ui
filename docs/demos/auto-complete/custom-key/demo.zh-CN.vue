<template>
  <AutoComplete
    v-model:value="value"
    :options="options"
    value-key="myValue"
    label-key="myLabel"
    style="width: 400px;"
    @input="setOptions"
  ></AutoComplete>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = ref<{ myValue: string, myLabel: string }[]>([])

function setOptions(value: string) {
  options.value = value
    ? [
        { myValue: value, myLabel: value },
        { myValue: value + value, myLabel: value + value },
        { myValue: value + value + value, myLabel: value + value + value }
      ]
    : []
}
</script>
