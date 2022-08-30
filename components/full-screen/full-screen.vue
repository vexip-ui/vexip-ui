<template>
  <div id="d-fullscreen">
    <!-- 切换全屏的插槽 -->
    <div class="fullscreen-change" @click="changeFull">
      <slot> </slot>
    </div>
    <!-- 全屏显示内容的插槽 -->
    <slot name="content"></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const emits = defineEmits(['changeFull'])

interface FullScreenDocumentElement extends HTMLElement {
  [x: string]: any,
  exitFullscreen: () => void,
  mozCancelFullScreen: () => void,
  webkitCancelFullScreen: () => void,
  msExitFullscreen: () => void
}

const isFullScreen = ref(false)

const changeFull = () => {
  const fullScrenStatus =
    document.fullscreenElement || document.msFullscreenElement || document.webkitFullscreenElement
  const targetElement = document.getElementById('d-fullscreen') as FullScreenDocumentElement
  if (!fullScrenStatus && !isFullScreen.value) {
    elementRequestFullscreen(targetElement)
    isFullScreen.value = true
  } else if (fullScrenStatus && isFullScreen.value) {
    exitImmersiveFullScreen()
    isFullScreen.value = false
  }
}

const elementRequestFullscreen = (element: FullScreenDocumentElement) => {
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  }
}

const exitImmersiveFullScreen = async () => {
  let fullscreenExit
  if (document.exitFullscreen) {
    fullscreenExit = document.exitFullscreen()
  } else if (document.mozCancelFullScreen) {
    fullscreenExit = document.mozCancelFullScreen()
  } else if (document.webkitCancelFullScreen) {
    fullscreenExit = Promise.resolve(document.webkitCancelFullScreen())
  } else if (document.msExitFullscreen) {
    fullscreenExit = Promise.resolve(document.msExitFullscreen())
  }
  return await fullscreenExit.then(() => !!document.fullscreenElement)
}

const onFullScreenChange = () => {
  const fullScrenStatus =
    document.fullscreenElement || document.msFullscreenElement || document.webkitFullscreenElement
  isFullScreen.value = !!fullScrenStatus
  emits('changeFull', { isFullScreen: isFullScreen.value })
}

document.addEventListener('webkitfullscreenchange', onFullScreenChange)
document.addEventListener('mozfullscreenchange', onFullScreenChange)
document.addEventListener('fullscreenchange', onFullScreenChange)
document.addEventListener('MSFullscreenChange', onFullScreenChange)
</script>
