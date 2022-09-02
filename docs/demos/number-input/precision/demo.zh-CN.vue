<template>
  <NumberInput v-model:value="value" :precision="2" style="max-width: 300px;"></NumberInput>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(10.123)
</script>
