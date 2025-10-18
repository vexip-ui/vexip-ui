<template>
  <div v-resize="handleResize" class="demo-window-get-width">
    <NativeScroll use-y-bar use-bar-track :height="windowHeight">
      <div
        :style="{
          width: windowWidth + 'px',
          height: h5Height + 'px',
          position: 'relative',
        }"
      >
        <ObjectFit
          ref="objectFit"
          :width="designWidth"
          :height="designHeight"
          fit="contain"
          :is-scale="true"
        >
          <div
            v-resize="handleH5Resize"
            style="position: relative; overflow: auto; background: #eee"
          >
            <!-- Imported H5 component -->
            <H5Component
              :window-width="windowWidth"
              :scale="objectFit?.scaleX"
              :current-width="objectFit?.innerWidth"
              :current-height="objectFit?.innerHeight"
              :design-width="designWidth"
            ></H5Component>
          </div>
        </ObjectFit>
      </div>
    </NativeScroll>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { ObjectFit } from 'vexip-ui'
import H5Component from './h5-component.en-US.vue'
const objectFit = ref()
// Window width
const windowWidth = ref(0)
const windowHeight = ref(0)

// Design draft width
const designWidth = 300
// Design draft height
const designHeight = ref(0)
// Listen for H5 page height changes
function handleH5Resize(entry: ResizeObserverEntry) {
  const { height } = entry.contentRect
  designHeight.value = height
}
// H5 page height
const h5Height = computed(() => {
  return (designHeight.value / designWidth) * windowWidth.value
})
// Listen for window changes
function handleResize(entry: ResizeObserverEntry) {
  windowWidth.value = entry.contentRect.width
  windowHeight.value = entry.contentRect.height
}
</script>

<style scoped>
.demo-window-get-width {
  position: relative;
  box-sizing: border-box;
  width: 300px;
  min-width: 100px;
  max-width: 1000px;
  height: 600px;
  min-height: 100px;
  max-height: 1000px;
  overflow: auto;
  color: #000;
  resize: both;
  background-color: var(--vxp-color-primary-base);
  scrollbar-width: none;
}

.demo-window-get-width::-webkit-scrollbar {
  display: none;
}

.demo-window-get-width :deep(.vxp-scrollbar-vars) {
  --vxp-scrollbar-bar-bg-color: #ffcf32;
  --vxp-scrollbar-track-bg-color: #ffee0017;
}
</style>
