<template>
  <div class="drawer-wrapper">
    <p style="margin-bottom: 16px">
      抽屉渲染在该元素中
    </p>
    <Button type="primary" @click="active = !active">
      打开
    </Button>
    <Drawer v-model:active="active" inner title="内置抽屉">
      <p>一些内容</p>
      <p>一些内容</p>
      <p>一些内容</p>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(false)
</script>

<style scoped>
.drawer-wrapper {
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
