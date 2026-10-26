<template>
  <Button type="primary" @click="active = !active">
    Open
  </Button>
  <Drawer
    v-model:active="active"
    transfer
    title="Title"
    footer
    confirm-type="success"
    cancel-type="error"
    action-size="default"
  >
    <p>Some content</p>
    <p>Some content</p>
    <p>Some content</p>
  </Drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(false)
</script>
