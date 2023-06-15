<template>
  <div class="modal-wrapper">
    <p style="margin-bottom: 16px">
      Modal rendered inside this element
    </p>
    <Button type="primary" @click="active = !active">
      Open
    </Button>
    <Modal
      v-model:active="active"
      inner
      title="Inner Modal"
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

<style scoped>
.modal-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  background-color: var(--vxp-fill-color-background);
  border: var(--vxp-border-light-2);
  border-radius: var(--vxp-border-radius-small);
}
</style>
