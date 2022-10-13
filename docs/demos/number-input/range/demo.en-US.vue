<template>
  <NumberInput
    v-model:value="value"
    :min="0"
    :max="10"
    style="max-width: 300px;"
  ></NumberInput>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<number>()
</script>
