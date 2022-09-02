<template>
  <Select v-model:value="value" :loading="loading" :options="options"></Select>
  <br />
  <br />
  <Button type="primary" :loading="loading" @click="loadOptions">
    加载选项
  </Button>
  <p>当前值：{{ value }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string>('选项3')
const options = ref<string[]>([])
const loading = ref(false)

function loadOptions() {
  if (loading.value) return

  loading.value = true

  setTimeout(() => {
    options.value = ['选项1', '选项2', '选项3', '选项4', '选项5']
    loading.value = false
  }, 2000)
}
</script>

<style scoped>
.vxp-select {
  max-width: 400px;
}
</style>
