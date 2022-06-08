<template>
  <div :class="prefix">
    <div :class="`${prefix}__picker`">
      <p :class="`${prefix}__tip`">
        {{ getMetaName(language, changeColor, false) }}
        <Icon :scale="1.2" @click="resetMajorColor">
          <ArrowRotateLeft></ArrowRotateLeft>
        </Icon>
      </p>
      <ColorPicker v-model:value="majorColor" format="rgb"></ColorPicker>
    </div>
    <div v-for="(colors, name) in seriesColors" :key="name" :class="`${prefix}__series`">
      <div v-for="(color, index) in colors" :key="index" :class="`${prefix}__series-item`">
        <div
          :class="`${prefix}__series-color`"
          :style="{
            backgroundColor: color
          }"
        ></div>
        {{ `${name}-${index + 1}` }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ArrowRotateLeft } from '@vexip-ui/icons'
import { parseColorToRgba, mixColor, adjustAlpha, toFixed } from '@vexip-ui/utils'
import { getMetaName } from '../common/meta-name'

import type { Color } from '@vexip-ui/utils'

defineProps({
  language: {
    type: String,
    default: __ROLLBACK_LANG__
  }
})

const prefix = 'major-color'

const changeColor = {
  name: 'Change Major Color',
  cname: '换个主题色'
}

const rootEl = document.documentElement
const rootStyle = getComputedStyle(rootEl)

const majorColor = ref(rootStyle.getPropertyValue('--vxp-color-primary-base'))

const seriesColors = ref<Record<string, string[]>>({})

computeSeriesColors(majorColor.value)
watch(majorColor, computeSeriesColors)

function computeSeriesColors(value: Color) {
  const colors: Record<string, string[]> = {
    light: [],
    opacity: [],
    dark: []
  }
  const black = parseColorToRgba(
    rootStyle.getPropertyValue('--vxp-color-black') || { r: 0, g: 0, b: 0, a: 1 }
  )
  const white = parseColorToRgba(
    rootStyle.getPropertyValue('--vxp-color-white') || { r: 255, g: 255, b: 255, a: 1 }
  )
  const style = rootEl.style

  for (let i = 1; i < 10; ++i) {
    const light = mixColor(white, value, i * 0.1).toString()
    const opacity = adjustAlpha(value, toFixed(1 - i * 0.1, 1)).toString()

    style.setProperty(`--vxp-color-primary-light-${i}`, light)
    style.setProperty(`--vxp-color-primary-opacity-${i}`, opacity)

    colors.light.push(light)
    colors.opacity.push(opacity)
  }

  for (let i = 1; i < 3; ++i) {
    const dark = mixColor(black, value, i * 0.1).toString()

    style.setProperty(`--vxp-color-primary-dark-${i}`, dark)

    colors.dark.push(dark)
  }

  style.setProperty('--vxp-color-primary-base', `${value}`)
  localStorage.setItem('vexip-docs-prefer-major-color', `${value}`)
  seriesColors.value = colors
}

function resetMajorColor() {
  majorColor.value = '#339af0'
}
</script>

<style lang="scss">
.major-color {
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;

  &__picker {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }

  &__tip {
    display: flex;
    align-items: center;
    margin: 0 0 20px;
    font-size: 15px;

    .vxp-icon {
      margin-left: 3px;
      color: var(--vxp-content-color-third);
      cursor: pointer;
      transition: var(--vxp-transition-color);

      &:hover {
        color: var(--vxp-content-color-base);
      }
    }
  }

  &__series {
    display: flex;
    margin-bottom: 15px;

    &-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 80px;
      font-size: 13px;
      color: var(--vxp-content-color-secondary);
    }

    &-color {
      width: 40px;
      height: 20px;
      margin-bottom: 3px;
      border-radius: var(--vxp-border-radius-base);
    }
  }
}
</style>
