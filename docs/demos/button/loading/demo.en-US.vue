<template>
  <Button loading type="primary">
    Loading
  </Button>
  <Button type="primary" :loading="loading" @click="load">
    Click me
  </Button>
  <Button loading circle type="primary">
    Loading
  </Button>
  <Button loading circle type="primary"></Button>
  <Button
    circle
    loading
    type="primary"
    icon-only
  >
    <MagnifyingGlass></MagnifyingGlass>
  </Button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MagnifyingGlass } from '@vexip-ui/icons'

const loading = ref(false)

function load() {
  loading.value = true

  setTimeout(() => {
    loading.value = false
  }, 3000)
}
</script>
