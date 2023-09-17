<template>
  <Button type="primary" @click="active = !active">
    打开
  </Button>
  <Modal
    v-model:active="active"
    transfer
    title="标题"
    :width="500"
    :height="300"
    modal-class="demo-modal"
  >
    <NativeScroll use-y-bar height="100%" scroll-style="padding: 14px;">
      <Select :transfer="false"></Select>
      <p v-for="n in 20" :key="n">
        一些内容
      </p>
    </NativeScroll>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(false)
</script>

<style scoped>
:global(.demo-modal .vxp-modal__content) {
  padding: 0;
}
</style>
