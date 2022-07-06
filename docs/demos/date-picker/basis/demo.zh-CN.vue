<template>
  <DatePicker v-model:value="date" style="max-width: 300px;"></DatePicker>
  <p>
    Current Date: {{ date }}
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const date = ref('2020-05-30')
</script>
