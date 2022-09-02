<template>
  <DatePicker
    v-model:value="date"
    date-separator=""
    :labels="{
      year: 'Y',
      month: 'M',
      date: 'D'
    }"
    style="max-width: 300px;"
  ></DatePicker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const date = ref('')
</script>
