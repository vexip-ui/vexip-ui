<template>
  <Button type="success" @click="active = !active">
    打开
  </Button>
  <Modal
    v-model:active="active"
    transfer
    title="标题"
    width="30vw"
    confirm-type="success"
    cancel-type="error"
    action-size="default"
  >
    <p>一些内容</p>
    <p>一些内容</p>
    <p>一些内容</p>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(false)
</script>
