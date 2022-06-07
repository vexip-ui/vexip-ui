<template>
  <ConfigProvider :props="outerProps">
    <Tag type="primary">
      外层标签
    </Tag>
    <br />
    <br />
    <ConfigProvider :props="innerProps">
      <Tag type="success">
        内层标签
      </Tag>
    </ConfigProvider>
  </ConfigProvider>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const outerProps = ref({
  tag: {
    simple: true,
    circle: true
  }
})

const innerProps = ref({
  tag: {
    closable: true,
    circle: false
  }
})
</script>
