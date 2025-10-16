<template>
  <div v-resize="handleResize" class="demo-window-get-width">
    <NativeScroll
      use-y-bar
      use-bar-track
      bar-color="orange"
      track-color="yellow"
      :height="windowHeight"
    >
      <div
        :style="{
          width: windowWidth + 'px',
          height: h5Height + 'px',
          position: 'relative',
        }"
      >
        <LayoutFit
          ref="layoutFit"
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
              :scale="layoutFit?.scaleX"
              :current-width="layoutFit?.currentWidth"
              :current-height="layoutFit?.currentHeight"
              :design-width="designWidth"
            ></H5Component>
          </div>
        </LayoutFit>
      </div>
    </NativeScroll>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { LayoutFit } from 'vexip-ui'
import H5Component from './h5-component.en-US.vue'
const layoutFit = ref()
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
</style>
