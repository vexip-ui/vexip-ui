<template>
  <Button loading type="primary">
    加载中
  </Button>
  <Button type="primary" :loading="loading" @click="load">
    点一下我
  </Button>
  <Button loading circle type="primary">
    加载中
  </Button>
  <Button loading circle type="primary"></Button>
  <Button circle loading type="primary">
    <template #icon>
      <Icon><MagnifyingGlass></MagnifyingGlass></Icon>
    </template>
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
