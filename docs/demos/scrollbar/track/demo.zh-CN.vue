<template>
  <div class="wrapper">
    <div ref="pane" class="scroll-pane" @scroll="handleScroll">
      <p v-for="n in 20" :key="n">
        {{ n }}、一段用来滚动的文本
      </p>
    </div>
    <Scrollbar
      ref="bar"
      use-track
      :bar-length="barLength"
      @scroll="handleBarScroll"
    ></Scrollbar>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { boundRange, multipleFixed } from '@vexip-ui/utils'

import type { ScrollbarExposed } from 'vexip-ui'

const pane = ref<HTMLElement>()
const bar = ref<ScrollbarExposed>()
const barLength = ref(35)

onMounted(() => {
  if (!pane.value) return

  barLength.value = boundRange(
    (pane.value.offsetHeight / (pane.value.scrollHeight || 1)) * 100,
    5,
    99
  )
})

function handleScroll() {
  if (!pane.value || !bar.value) return

  const { scrollTop, scrollHeight, offsetHeight } = pane.value

  if (scrollHeight <= offsetHeight) {
    bar.value.handleScroll(0)
    return
  }

  const percent = multipleFixed(scrollTop / (scrollHeight - offsetHeight || 1), 100, 2)
  bar.value.handleScroll(percent)
}

function handleBarScroll(percent: number) {
  if (!pane.value) return

  const { scrollHeight, offsetHeight } = pane.value

  if (scrollHeight <= offsetHeight) return

  pane.value.scrollTop = (percent * (scrollHeight - offsetHeight)) / 100
}
</script>

<style scoped>
.wrapper {
  position: relative;
  max-width: 500px;
  padding: 0 10px;
  border: var(--vxp-border-base);
}

.scroll-pane {
  width: 100%;
  height: 200px;
  overflow: auto;
  scrollbar-width: none;
}

.scroll-pane::-webkit-scrollbar {
  display: none;
}
</style>
