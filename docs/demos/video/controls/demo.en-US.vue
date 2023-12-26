<template>
  <div style="max-width: 800px; max-height: 450px">
    <Video src="/video-1.mp4" :control-layout="controlLayout">
      <template #control-input>
        <div
          style="max-width: 300px; background-color: rgba(255, 255, 255, 30%); border-radius: 4px"
        >
          <Input size="small" transparent style="--vxp-input-control-color: #fff"></Input>
        </div>
      </template>
    </Video>
  </div>
</template>

<script setup lang="ts">
import type { VideoControlLayout } from 'vexip-ui'

const controlLayout: VideoControlLayout = {
  left: ['play', 'timer', 'volume'],
  center: ['input'],
  right: ['play-rate', 'pip', 'full-window', 'full-browser']
}
</script>
