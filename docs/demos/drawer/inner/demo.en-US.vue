<template>
  <div class="demo-drawer-inner-wrapper">
    <p style="margin-bottom: 16px;">
      Drawer rendered inside this element
    </p>
    <Button type="primary" @click="active = !active">
      Open
    </Button>
    <Drawer v-model:active="active" inner title="Inner Drawer">
      <p>Some content</p>
      <p>Some content</p>
      <p>Some content</p>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(false)
</script>

<style>
.demo-drawer-inner-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  background-color: var(--vxp-fill-color-background);
  border: var(--vxp-border-light-2);
  border-radius: var(--vxp-border-radius-small);
}
</style>
