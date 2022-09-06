<template>
  <Spin :active="active" tip="Loading...">
    <Alert icon type="warning" title="警告标题">
      警告提示的内容
    </Alert>
  </Spin>
  <p>切换加载中状态：<Switch v-model:value="active"></Switch></p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(true)
</script>
