<template>
  <div
    ref="wrapper"
    :class="`${prefix}__palette`"
    :style="{
      backgroundColor: `hsl(${hue}, 100%, 50%)`
    }"
    @mousedown="handleMouseDown"
  >
    <div :class="`${prefix}__saturation`"></div>
    <div :class="`${prefix}__value`"></div>
    <div
      :class="`${prefix}__palette-handler`"
      :style="{
        top: `${currentTop}%`,
        left: `${currentLeft}%`
      }"
    >
      <div :class="`${prefix}__palette-pointer`"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { toFixed, throttle } from '@vexip-ui/utils'

export default defineComponent({
  name: 'ColorPalette',
  props: {
    hue: {
      type: Number,
      default: 0,
      validator: (value: number) => {
        return value >= 0 && value <= 360
      }
    },
    value: {
      type: Number,
      default: 1,
      validator: (value: number) => {
        return value >= 0 && value <= 1
      }
    },
    saturation: {
      type: Number,
      default: 0,
      validator: (value: number) => {
        return value >= 0 && value <= 1
      }
    }
  },
  emits: ['edit-start', 'edit-end', 'change'],
  setup(props, { emit }) {
    const currentTop = ref((1 - props.value) * 100)
    const currentLeft = ref(props.saturation * 100)

    const wrapper = ref<HTMLElement | null>(null)

    let prevTop = currentTop.value
    let prevLeft = currentLeft.value

    watch(
      () => props.value,
      value => {
        currentTop.value = (1 - value) * 100
        verifyPosition()
      },
      { immediate: true }
    )
    watch(
      () => props.saturation,
      value => {
        currentLeft.value = value * 100
        verifyPosition()
      },
      { immediate: true }
    )

    let widthLimit: number
    let heightLimit: number
    let topStartAt: number
    let leftStartAt: number
    let cursorXPosition: number
    let cursorYPosition: number

    const refreshPosition = throttle((clientX: number, clientY: number) => {
      currentTop.value = ((topStartAt + clientY - cursorYPosition) / heightLimit) * 100
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
      const { top, left, width, height } = rect
      const { clientX, clientY } = event

      widthLimit = width
      heightLimit = height

      currentTop.value = ((topStartAt = clientY - top) / height) * 100
      currentLeft.value = ((leftStartAt = clientX - left) / width) * 100

      cursorXPosition = clientX
      cursorYPosition = clientY

      verifyPosition()

      let changed = false

      if (Math.abs(currentTop.value - prevTop) >= 0.01) {
        prevTop = currentTop.value
        changed = true
      }

      if (Math.abs(currentLeft.value - prevLeft) >= 0.01) {
        prevLeft = currentLeft.value
        changed = true
      }

      changed && handleChange()

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)

      emit('edit-start')
    }

    function handleMouseMove(event: MouseEvent) {
      // 阻止默认操作不可节流
      event.preventDefault()
      event.stopPropagation()

      refreshPosition(event.clientX, event.clientY)
    }

    function handleMouseUp(event: MouseEvent) {
      event.stopPropagation()

      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)

      emit('edit-end')
    }

    function verifyPosition() {
      currentTop.value = toFixed(Math.max(0, Math.min(currentTop.value, 100)), 3)
      currentLeft.value = toFixed(Math.max(0, Math.min(currentLeft.value, 100)), 3)
    }

    function handleChange() {
      emit('change', {
        h: props.hue,
        s: currentLeft.value / 100,
        v: toFixed(1 - currentTop.value / 100, 3)
      })
    }

    return {
      prefix: 'vxp-color-picker',
      currentTop,
      currentLeft,

      wrapper,

      handleMouseDown
    }
  }
})
</script>
