<template>
  <Select v-model:value="value" :loading="loading" :options="options"></Select>
  <br />
  <br />
  <Button type="primary" :loading="loading" @click="loadOptions">
    Load options
  </Button>
  <p>Current value: {{ value }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string>('Option 3')
const options = ref<string[]>([])
const loading = ref(false)

function loadOptions() {
  if (loading.value) return

  loading.value = true

  setTimeout(() => {
    options.value = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']
    loading.value = false
  }, 2000)
}
</script>

<style scoped>
.vxp-select {
  max-width: 400px;
}
</style>
