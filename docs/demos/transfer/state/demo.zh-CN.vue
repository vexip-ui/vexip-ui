<template>
  <Transfer v-model:value="value" :options="options"></Transfer>
  <br />
  <Transfer v-model:value="value" :options="options" state="success"></Transfer>
  <br />
  <Transfer
    v-model:value="value"
    :options="options"
    deep-state
    state="warning"
  ></Transfer>
  <br />
  <Transfer v-model:value="value" :options="options" state="error"></Transfer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(Array.from({ length: 20 }, (_, index) => index))
const options = Array.from({ length: 40 }, (_, index) => ({
  value: index,
  label: `选项${index + 1}`,
  disabled: index % 6 === 0,
}))
</script>
