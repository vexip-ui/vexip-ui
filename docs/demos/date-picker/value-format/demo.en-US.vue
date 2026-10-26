<template>
  <DatePicker
    v-model:value="date"
    v-model:formatted-value="formatted"
    value-format="yyyy-MM-dd HH:mm:ss"
    clearable
    style="max-width: 300px"
  ></DatePicker>
  <p>Current Date: {{ date }}</p>
  <p>Formatted Date: {{ formatted }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const date = ref<number>()
const formatted = ref<string>()
</script>
