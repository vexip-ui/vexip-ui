<template>
  <p>Input Value: {{ value }}</p>
  <Input
    v-model:value="value"
    sync
    clearable
    style="max-width: 300px"
  ></Input>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
