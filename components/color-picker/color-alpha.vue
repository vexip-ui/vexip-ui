<template>
  <div
    ref="wrapper"
    :class="nh.be('alpha')"
    tabindex="-1"
    role="group"
  >
    <div
      :class="nh.be('opacity')"
      :style="{
        backgroundImage: `linear-gradient(to right, rgba(${rgbString}, 0) 0%, rgb(${rgbString}) 100%)`
      }"
    ></div>
    <div :class="nh.be('alpha-handler')" :style="{ left: `${currentLeft}%` }"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'

import { useNameHelper } from '@vexip-ui/config'
import { useModifier, useMoving } from '@vexip-ui/hooks'
import { boundRange, toFixed } from '@vexip-ui/utils'

import type { PropType } from 'vue'
import type { RGBColor } from '@vexip-ui/utils'

export default defineComponent({
  name: 'ColorAlpha',
  props: {
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
  },
  emits: ['edit-start', 'edit-end', 'change'],
  setup(props, { emit }) {
    const currentLeft = ref(props.alpha * 100)

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

    function verifyPosition() {
      currentLeft.value = toFixed(boundRange(currentLeft.value, 0, 100), 3)
    }

    function handleChange() {
      emit('change', currentLeft.value / 100)
    }

    return {
      nh: useNameHelper('color-picker'),
      currentLeft,
      editing,

      rgbString,

      wrapper
    }
  }
})
</script>
