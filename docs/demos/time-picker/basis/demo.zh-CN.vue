<template>
  <TimePicker v-model:value="time" clearable style="max-width: 300px"></TimePicker>
  <p>Current Time: {{ time }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const time = ref('')
</script>
