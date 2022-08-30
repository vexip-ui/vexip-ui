<template>
  <Input v-model:value="value" placeholder="基础用法" style="max-width: 300px;"></Input>
  <p>Input Value: {{ value }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
