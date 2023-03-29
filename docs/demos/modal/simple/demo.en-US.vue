<template>
  <div>
    <Button type="primary" @click="active = !active">
      Open
    </Button>
    <Modal
      v-model:active="active"
      transfer
      no-footer
      :width="500"
    >
      <p>Some content</p>
      <p>Some content</p>
      <p>Some content</p>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(false)
</script>
