<template>
  <Button type="primary" @click="active = !active">
    打开查看器
  </Button>
  <Modal
    v-model:active="active"
    title="查看"
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
