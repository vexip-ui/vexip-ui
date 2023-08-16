<template>
  <div
    style="max-width: 200px; height: 200px; padding: 20px; background-color: orange"
    @click="handleClick"
  >
    在橙色区域点击
  </div>
  <Tooltip
    :visible="visible"
    trigger="custom"
    :virtual="position"
    @click-outside="visible = false"
  >
    一些提示的内容
  </Tooltip>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const visible = ref(false)
const position = reactive({
  x: 0,
  y: 0
})

function handleClick(event: MouseEvent) {
  if (visible.value) {
    visible.value = false
  } else {
    position.x = event.clientX
    position.y = event.clientY
    visible.value = true
  }
}
</script>
