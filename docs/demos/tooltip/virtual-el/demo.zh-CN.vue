<template>
  <Button ref="button">
    外部元素
  </Button>
  <Tooltip :virtual="button">
    一些提示的内容
  </Tooltip>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const button = ref<HTMLElement | null>(null)
</script>
