<template>
  <Spin :active="active" tip="Loading..." delay>
    <Alert icon type="info" title="提示标题">
      消息提示的内容
    </Alert>
  </Spin>
  <Spin :active="active" tip="Loading..." :delay="1000">
    <Alert icon type="success" title="提示标题">
      成功提示的内容
    </Alert>
  </Spin>
  <Spin :active="active" tip="Loading..." :delay="[300, 0]">
    <Alert icon type="error" title="提示标题">
      错误提示的内容
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
