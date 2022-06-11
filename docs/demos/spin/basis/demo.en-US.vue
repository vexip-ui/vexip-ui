<template>
  <Spin :active="active" tip="Loading...">
    <Alert icon type="warning" title="Alert Title">
      Some content to alert
    </Alert>
  </Spin>
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
