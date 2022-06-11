<template>
  <DatePicker v-model:value="date" no-filler style="width: 220px;"></DatePicker>
  <p>
    Current Date: {{ date }}
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const date = ref('2020-05-30')
</script>
