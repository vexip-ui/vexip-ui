<template>
  <div style="display: inline-flex; border: var(--vxp-border-base);">
    <Scroll :mode="`horizontal${exact ? '-exact' : ''}`" use-x-bar width="25em">
      <p>在此处滚动鼠标滚轮</p>
      <p>
        这是一段很长很长很长很长长很长很长很长长很长很长
        很长长很长很长很长长很长很长很长长很长很长很长长
        很长很长很长长很长很长很长长很长很长很长的文字
      </p>
    </Scroll>
  </div>
  <p>
    精准模式：
    <Switch v-model:value="exact"></Switch>
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const exact = ref(false)
</script>

<style scoped>
.vxp-scroll p {
  padding: 5px 10px;
  white-space: nowrap;
}
</style>
