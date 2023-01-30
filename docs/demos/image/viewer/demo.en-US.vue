<template>
  <Image src="https://www.vexipui.com/picture-1.jpg" width="300" @preview="handlePreview"></Image>
  <br />
  <br />
  <ImageGroup show-all @preview="handlePreview">
    <Image src="https://www.vexipui.com/picture-3.jpg" width="300"></Image>
    <Image src="https://www.vexipui.com/picture-4.jpg" width="300"></Image>
  </ImageGroup>
  <ImageViewer
    v-model:active="viewerActive"
    v-model:index="viewIndex"
    :srcs="srcList"
  ></ImageViewer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const viewerActive = ref(false)
const viewIndex = ref(0)
const srcList = ref<string[]>([])

function handlePreview(src: string, srcs?: string[]) {
  if (srcs?.length) {
    viewIndex.value = srcs.findIndex(s => s === src)
    srcList.value = srcs
  } else {
    viewIndex.value = 0
    srcList.value = [src]
  }

  viewerActive.value = true
}
</script>
