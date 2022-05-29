<template>
  <ResizeObserver throttle @resize="handleResize">
    <div class="resizable-pane">
      <span>
        Width: {{ width }}px {{ width === 1000 ? '(Max)' : width === 200 ? '(Min)' : '' }}
      </span>
      <span>
        Height: {{ height }}px {{ height === 600 ? '(Max)' : height === 80 ? '(Min)' : '' }}
      </span>
    </div>
  </ResizeObserver>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const width = ref(0)
const height = ref(0)

function handleResize(entry: ResizeObserverEntry) {
  console.info('toggle resize')

  const box = entry.borderBoxSize?.[0]

  if (box) {
    width.value = box.inlineSize
    height.value = box.blockSize
  } else {
    width.value = entry.contentRect.width
    height.value = entry.contentRect.height
  }
}
</script>

<style>
.resizable-pane {
  display: inline-flex;
  flex-direction: column;
  width: 300px;
  min-width: 200px;
  max-width: 1000px;
  height: 200px;
  min-height: 80px;
  max-height: 600px;
  padding: 10px;
  overflow: auto;
  color: #fff;
  resize: both;
  background-color: var(--vxp-color-primary-base);
  border: var(--vxp-border-base);
  border-radius: var(--vxp-border-radius-large);
}
</style>
