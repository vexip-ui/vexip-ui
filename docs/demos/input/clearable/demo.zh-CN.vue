<template>
  <Input v-model:value="value" clearable style="max-width: 300px"></Input>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
