<template>
  <Wheel v-model:value="value" :options="options"></Wheel>
  <p>
    Wheel Value:
    <br />
    {{ value }}
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('选项1')
const options = Array.from({ length: 20 }, (_, index) => `选项${index + 1}`)
</script>
