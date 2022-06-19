<template>
  <Spin :active="active" tip="Loading...">
    <Alert icon type="warning" title="警告标题">
      警告提示的内容
    </Alert>
  </Spin>
  <p>切换加载中状态：<Switch v-model:value="active"></Switch></p>
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
