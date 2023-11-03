<template>
  <Button type="success" @click="active = !active">
    Open
  </Button>
  <Modal
    v-model:active="active"
    transfer
    title="Title"
    width="30vw"
    confirm-type="success"
    cancel-type="error"
    action-size="default"
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
