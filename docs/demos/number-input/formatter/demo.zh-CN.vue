<template>
  <NumberInput v-model:value="value" :formatter="format" style="max-width: 300px"></NumberInput>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(6666)

function format(value: number) {
  return `${value}次`
}
</script>
