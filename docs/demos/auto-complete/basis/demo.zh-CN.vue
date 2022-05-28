<template>
  <AutoComplete
    v-model:value="value"
    style="width: 400px;"
    :options="options"
    @input="setOptions"
  ></AutoComplete>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = ref<string[]>([])

function setOptions(value: string) {
  options.value = value ? [value, value + value, value + value + value] : []
}
</script>
