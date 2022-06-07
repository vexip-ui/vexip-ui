<template>
  <ConfigProvider :props="outerProps">
    <Tag type="primary">
      Outer Tag
    </Tag>
    <br />
    <br />
    <ConfigProvider :props="innerProps">
      <Tag type="success">
        Inner Tag
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
