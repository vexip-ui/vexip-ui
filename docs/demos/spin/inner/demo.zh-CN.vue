<template>
  <div style="position: relative; width: 400px; padding-top: 60px; background-color: #fab00577;">
    <Spin :active="active" inner></Spin>
  </div>
  <p>切换加载中状态：<Switcher v-model:value="active"></Switcher></p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const active = ref(true)

    return {
      active
    }
  }
})
</script>
