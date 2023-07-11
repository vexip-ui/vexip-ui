<template>
  <div class="modal-wrapper">
    <p style="margin-bottom: 16px">
      模态框渲染在该元素中
    </p>
    <Button type="primary" @click="active = !active">
      打开
    </Button>
    <Modal
      v-model:active="active"
      inner
      title="内置模态框"
      :width="500"
      draggable
    >
      <p>一些内容</p>
      <p>一些内容</p>
      <p>一些内容</p>
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
