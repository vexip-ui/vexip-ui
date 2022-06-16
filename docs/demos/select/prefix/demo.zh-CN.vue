<template>
  <Select v-model:value="value" :prefix="User" :options="options"></Select>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { User } from '@vexip-ui/icons'

const value = ref('')
const options = ['选项1', '选项2', '选项3']
</script>

<style scoped>
.vxp-select {
  max-width: 400px;
}
</style>
