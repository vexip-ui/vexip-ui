<template>
  <div ref="wrapper" :class="`${prefix}__alpha`" @mousedown="handleMouseDown">
    <div
      :class="`${prefix}__opacity`"
      :style="{
        backgroundImage: `linear-gradient(to right, rgba(${rgbString}, 0) 0%, rgb(${rgbString}) 100%)`
      }"
    ></div>
    <div :class="`${prefix}__alpha-handler`" :style="{ left: `${currentLeft}%` }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import { toFixed, throttle } from '@vexip-ui/utils'

import type { PropType } from 'vue'
import type { RGBColor } from '@vexip-ui/utils'

const props = {
  rgb: {
    type: Object as PropType<RGBColor>,
    default: () => {
      return { r: 0, g: 0, b: 0 }
    },
    validator: (value: RGBColor) => {
      return 'r' in value && 'g' in value && 'b' in value
    }
  },
  alpha: {
    type: Number,
    default: 1,
    validator: (value: number) => {
      return value >= 0 && value <= 1
    }
  }
}

export default defineComponent({
  name: 'ColorAlpha',
  props,
  emits: ['edit-start', 'edit-end', 'change'],
  setup(props, { emit }) {
    const currentLeft = ref(props.alpha * 100)

    const wrapper = ref<HTMLElement | null>(null)

    let prevLeft = currentLeft.value

    const rgbString = computed(() => {
      const { r, g, b } = props.rgb

      return `${r}, ${g}, ${b}`
    })

    verifyPosition()

    watch(
      () => props.alpha,
      value => {
        currentLeft.value = value * 100
        verifyPosition()
      },
      { immediate: true }
    )

    let widthLimit: number
    let leftStartAt: number
    let cursorXPosition: number

    const refreshPosition = throttle((clientX: number) => {
      currentLeft.value = ((leftStartAt + clientX - cursorXPosition) / widthLimit) * 100

      verifyPosition()
      handleChange()
    })

    function handleMouseDown(event: MouseEvent) {
      if (event.button !== 0 || !wrapper.value) {
        return false
      }

      event.stopPropagation()

      const rect = wrapper.value.getBoundingClientRect()
      // const prevLeft = currentLeft.value

      widthLimit = rect.width
      currentLeft.value = ((leftStartAt = event.clientX - rect.left) / rect.width) * 100
      cursorXPosition = event.clientX

      verifyPosition()

      if (Math.abs(currentLeft.value - prevLeft) >= 0.01) {
        prevLeft = currentLeft.value
        handleChange()
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)

      emit('edit-start')
    }

    function handleMouseMove(event: MouseEvent) {
      // 阻止默认操作不可节流
      event.preventDefault()
      event.stopPropagation()

      refreshPosition(event.clientX)
    }

    function handleMouseUp(event: MouseEvent) {
      event.stopPropagation()

      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)

      emit('edit-end')
    }

    function verifyPosition() {
      currentLeft.value = toFixed(Math.max(0, Math.min(currentLeft.value, 100)), 3)
    }

    function handleChange() {
      emit('change', currentLeft.value / 100)
    }

    return {
      prefix: 'vxp-color-picker',
      currentLeft,

      rgbString,

      wrapper,

      handleMouseDown
    }
  }
})
</script>
