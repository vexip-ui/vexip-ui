<template>
  <Select v-model:value="value" :prefix="User">
    <Option>选项1</Option>
    <Option>选项2</Option>
    <Option>选项3</Option>
  </Select>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { User } from '@vexip-ui/icons'

const value = ref('')
</script>
