<template>
  <Input
    v-model:value="value"
    sync
    clearable=""
    style="max-width: 300px;"
  ></Input>
  <p>Input Value: {{ value }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
