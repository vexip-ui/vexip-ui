<template>
  <TimePicker
    v-model:value="time"
    separator=""
    :labels="{
      hour: '时',
      minute: '分',
      second: '秒'
    }"
    style="max-width: 300px;"
  ></TimePicker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const time = ref('')
</script>
