<template>
  <div v-resize="handleResize" class="demo-window-get-width" style="width: 600px; height: 600px">
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
        <div style=" height: 100%; overflow: auto; color: #000;background: #fff">
          <h3>LayoutFit 示例</h3>
          <h3>适合邪修开发H5</h3>
          <p>这是一个自适应布局容器，会根据父容器尺寸自动调整内容大小。</p>
          <p>这里可以是一个好看的H5页面</p>
          <p>或根据设计稿自动生成的H5页面</p>
          <p>使用绝对单位完成页面开发</p>

          <p>窗口宽度: {{ windowWidth }}</p>
          <p>缩放比例: {{ layoutFit?.scaleX }}|{{ layoutFit?.scaleY }}</p>
          <p></p>
          <p>实际的像素宽度：{{ layoutFit?.currentWidth }}</p>
          <p>实际的像素高度：{{ layoutFit?.currentHeight }}</p>
        </div>
      </LayoutFit>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { LayoutFit } from 'vexip-ui'
const layoutFit = ref()
// 窗口宽度
const windowWidth = ref(0)
// 设计稿宽度
const designWidth = 300
// 设计稿高度
const designHeight = 900
// H5页面高度
const h5Height = computed(() => {
  return (designHeight / designWidth) * windowWidth.value
})

function handleResize(entry: ResizeObserverEntry) {
  windowWidth.value = entry.contentRect.width
}
</script>

<style scoped>
.demo-window-get-width {
  position: relative;
  box-sizing: border-box;
  min-width: 100px;
  max-width: 1000px;
  min-height: 100px;
  max-height: 1000px;
  overflow: auto;
  color: #000;
  resize: both;
  background-color: var(--vxp-color-primary-base);
}
</style>
