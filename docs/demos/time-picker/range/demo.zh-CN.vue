<template>
  <TimePicker
    v-model:value="time"
    range
    clearable
    style="max-width: 300px"
  ></TimePicker>
  <p>Current Time Range: {{ time }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const time = ref<string[]>([])
</script>
