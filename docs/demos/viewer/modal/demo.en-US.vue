<template>
  <Button type="primary" @click="active = !active">
    Open Viewer
  </Button>
  <Modal
    v-model:active="active"
    title="View"
    no-footer
  >
    <Viewer>
      <img src="/picture-1.jpg" />
    </Viewer>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(false)
</script>
