<template>
  <Button type="primary" @click="active = !active">
    Open
  </Button>
  <Masker
    v-model:active="active"
    transfer
    closable
    @close="active = false"
  ></Masker>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(false)
</script>
