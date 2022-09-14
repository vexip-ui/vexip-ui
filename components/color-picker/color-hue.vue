<template>
  <div ref="wrapper" :class="nh.be('hue')" tabindex="-1">
    <div :class="nh.be('hue-handler')" :style="{ left: `${currentLeft}%` }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useNameHelper } from '@vexip-ui/config'
import { useModifier, useMoving } from '@vexip-ui/hooks'
import { toFixed, boundRange } from '@vexip-ui/utils'

export default defineComponent({
  name: 'ColorHue',
  props: {
    hue: {
      type: Number,
      default: 0,
      validator: (value: number) => {
        return value >= 0 && value <= 360
      }
    }
  },
  emits: ['edit-start', 'edit-end', 'change'],
  setup(props, { emit }) {
    const currentLeft = ref(props.hue * 100)

    let prevLeft = currentLeft.value
    let widthLimit: number
    let leftStartAt: number

    const { target: wrapper } = useModifier({
      passive: false,
      onKeyDown: (event, modifier) => {
        if (modifier.left || modifier.right) {
          event.preventDefault()

          const step = event.ctrlKey ? 10 : event.altKey ? 0.5 : 2
          const delta = step * (modifier.left ? -1 : 1)

          currentLeft.value += delta

          verifyPosition()
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
        const { left, width } = rect

        widthLimit = width
        currentLeft.value = ((leftStartAt = state.clientX - left) / width) * 100

        verifyPosition()
        emit('edit-start')

        if (Math.abs(currentLeft.value - prevLeft) >= 0.01) {
          prevLeft = currentLeft.value
          handleChange()
        }
      },
      onMove: state => {
        currentLeft.value = ((leftStartAt + state.deltaX) / widthLimit) * 100

        verifyPosition()
        handleChange()
      },
      onEnd: () => {
        emit('edit-end')
      }
    })

    watch(
      () => props.hue,
      value => {
        currentLeft.value = (value / 360) * 100
        verifyPosition()
      },
      { immediate: true }
    )

    function verifyPosition() {
      currentLeft.value = toFixed(boundRange(currentLeft.value, 0, 100), 3)
    }

    function handleChange() {
      emit('change', (currentLeft.value / 100) * 360)
    }

    return {
      nh: useNameHelper('color-picker'),
      currentLeft,
      editing,

      wrapper
    }
  }
})
</script>
