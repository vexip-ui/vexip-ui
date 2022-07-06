<template>
  <TimePicker v-model:value="time" style="max-width: 300px;"></TimePicker>
  <p>
    Current Time: {{ time }}
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const time = ref('09:24:47')
</script>
