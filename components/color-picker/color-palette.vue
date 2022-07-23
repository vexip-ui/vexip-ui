<template>
  <div
    ref="wrapper"
    :class="nh.be('palette')"
    tabindex="-1"
    :style="{
      backgroundColor: `hsl(${hue}, 100%, 50%)`
    }"
  >
    <div :class="nh.be('saturation')"></div>
    <div :class="nh.be('value')"></div>
    <div
      :class="nh.be('palette-handler')"
      :style="{
        top: `${currentTop}%`,
        left: `${currentLeft}%`
      }"
    >
      <div :class="nh.be('palette-pointer')"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useNameHelper } from '@vexip-ui/config'
import { useModifier, useMoving } from '@vexip-ui/mixins'
import { toFixed, boundRange } from '@vexip-ui/utils'

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

    let prevTop = currentTop.value
    let prevLeft = currentLeft.value
    let widthLimit: number
    let heightLimit: number
    let topStartAt: number
    let leftStartAt: number

    const { target: wrapper } = useModifier({
      passive: false,
      onKeyDown: (event, modifier) => {
        if (modifier.up || modifier.down || modifier.left || modifier.right) {
          event.preventDefault()

          const step = modifier.ctrl ? 10 : modifier.alt ? 0.5 : 2
          const sign = modifier.up || modifier.left ? -1 : 1
          const delta = step * sign

          if (modifier.up || modifier.down) {
            currentTop.value += delta
          } else {
            currentLeft.value += delta
          }

          verifyPosition()
          prevTop = currentTop.value
          prevLeft = currentLeft.value
          handleChange()
        }
      }
    })

    const { moving: editing } = useMoving({
      target: wrapper,
      onStart: (state, event) => {
        if (!wrapper.value || event.button > 0) {
          return false
        }

        const rect = wrapper.value.getBoundingClientRect()
        const { top, left, width, height } = rect

        widthLimit = width
        heightLimit = height

        currentTop.value = ((topStartAt = state.clientY - top) / height) * 100
        currentLeft.value = ((leftStartAt = state.clientX - left) / width) * 100

        verifyPosition()
        emit('edit-start')

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
      },
      onMove: state => {
        currentTop.value = ((topStartAt + state.deltaY) / heightLimit) * 100
        currentLeft.value = ((leftStartAt + state.deltaX) / widthLimit) * 100

        verifyPosition()
        handleChange()
      },
      onEnd: () => {
        emit('edit-end')
      }
    })

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

    function verifyPosition() {
      currentTop.value = toFixed(boundRange(currentTop.value, 0, 100), 3)
      currentLeft.value = toFixed(boundRange(currentLeft.value, 0, 100), 3)
    }

    function handleChange() {
      emit('change', {
        h: props.hue,
        s: currentLeft.value / 100,
        v: toFixed(1 - currentTop.value / 100, 3)
      })
    }

    return {
      nh: useNameHelper('color-picker'),
      currentTop,
      currentLeft,
      editing,

      wrapper

      // handleMouseDown
    }
  }
})
</script>
