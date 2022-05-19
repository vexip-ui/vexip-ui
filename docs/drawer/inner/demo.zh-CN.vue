<template>
  <div class="demo-drawer-inner-wrapper">
    <p style="margin-bottom: 16px;">
      抽屉渲染在该元素中
    </p>
    <Button type="primary" @on-click="active = !active">
      打开
    </Button>
    <Drawer v-model:active="active" inner title="内置抽屉">
      <p>一些内容</p>
      <p>一些内容</p>
      <p>一些内容</p>
    </Drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const active = ref(false)

    return { active }
  }
})
</script>

<style>
.demo-drawer-inner-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 2px;
}
</style>
