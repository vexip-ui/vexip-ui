<template>
  <TimePicker
    v-model:value="time"
    filler="?"
    clearable
    style="max-width: 300px;"
  ></TimePicker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const time = ref('')
</script>
