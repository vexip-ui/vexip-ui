<template>
  <div>
    <Button type="primary" @click="active = !active">
      Open
    </Button>
    <Modal
      v-model:active="active"
      transfer
      :width="500"
      resizable
      title="Title"
    >
      <p>Some Content</p>
      <p>Some Content</p>
      <p>Some Content</p>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(false)
</script>

<style>
.vxp-modal {
  min-width: 500px;
}
</style>
