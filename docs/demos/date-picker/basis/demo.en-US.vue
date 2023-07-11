<template>
  <DatePicker v-model:value="date" clearable style="max-width: 300px"></DatePicker>
  <p>Current Date: {{ date }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const date = ref(null)
</script>
