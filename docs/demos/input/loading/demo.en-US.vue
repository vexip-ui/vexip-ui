<template>
  <Input :loading="loading" placeholder="loading and editable"></Input>
  <br />
  <br />
  <Input :loading="loading" loading-lock placeholder="loading and readonly"></Input>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
</script>

<style scoped>
.vxp-input-wrapper {
  max-width: 300px;
}
</style>
