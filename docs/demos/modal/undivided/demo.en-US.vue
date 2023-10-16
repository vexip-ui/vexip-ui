<template>
  <Button type="primary" @click="active = !active">
    Undivided
  </Button>
  <Modal
    v-model:active="active"
    transfer
    undivided
    title="Title"
    width="30vw"
  >
    <p>Some content</p>
    <p>Some content</p>
    <p>Some content</p>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(false)
</script>
