<template>
  <div ref="wrapper" :class="`${prefix}__hue`" @mousedown="handleMouseDown">
    <div :class="`${prefix}__hue-handler`" :style="{ left: `${currentLeft}%` }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { toFixed, throttle } from '@vexip-ui/utils'

const props = {
  hue: {
    type: Number,
    default: 0,
    validator: (value: number) => {
      return value >= 0 && value <= 360
    }
  }
}

export default defineComponent({
  name: 'ColorHue',
  props,
  emits: ['on-edit-start', 'on-edit-end', 'on-change'],
  setup(props, { emit }) {
    const currentLeft = ref(props.hue * 100)

    const wrapper = ref<HTMLElement | null>(null)

    let prevLeft = currentLeft.value

    watch(
      () => props.hue,
      value => {
        currentLeft.value = (value / 360) * 100
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

      emit('on-edit-start')
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

      emit('on-edit-end')
    }

    function verifyPosition() {
      currentLeft.value = toFixed(Math.max(0, Math.min(currentLeft.value, 100)), 3)
    }

    function handleChange() {
      emit('on-change', (currentLeft.value / 100) * 360)
    }

    return {
      prefix: 'vxp-color-picker',
      currentLeft,

      wrapper,

      handleMouseDown
    }
  }
})
</script>
