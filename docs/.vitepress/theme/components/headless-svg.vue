<script setup lang="ts">
import { markRaw, ref } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  maxHeight: {
    type: Number,
    default: 240
  }
})

const svgs = import.meta.glob('../../assets/headless/*.svg', { eager: true, import: 'default' })

const svg = ref<Record<string, any>>()
const path = Object.keys(svgs).find(path => path.endsWith(`${props.name}.svg`))

if (path) {
  svg.value = markRaw(svgs[path] as any)
}
</script>

<template>
  <component :is="svg" class="headless-svg" :style="{ maxHeight: `${maxHeight}px` }"></component>
</template>

<style lang="scss">
.headless-svg {
  width: 100%;
  padding: 56px 20px;
  margin-bottom: 16px;
  user-select: none;
  background-color: var(--vxp-color-primary-opacity-9);
  border-radius: var(--vxp-radius-base);
}
</style>
