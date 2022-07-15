<template>
  <div
    style="width: 200px; height: 200px; padding: 20px; background-color: orange;"
    @click="handleClick"
  >
    Click on the orange area
  </div>
  <Tooltip :visible="visible" trigger="custom" :virtual="position">
    Some tip content
  </Tooltip>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

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
