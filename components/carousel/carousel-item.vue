<template>
  <div :class="className" :style="style">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, inject, onBeforeUnmount } from 'vue'
import { CAROUSEL_STATE } from './symbol'

import type { ItemState, CarouselState } from './symbol'

export default defineComponent({
  name: 'CarouselItem',
  setup() {
    const carouselState = inject<CarouselState | null>(CAROUSEL_STATE, null)

    const prefix = 'vxp-carousel'
    const state: ItemState = reactive({
      label: -1,
      width: 0,
      height: 0,
      offset: 0
    })

    const className = computed(() => {
      return {
        [`${prefix}__item`]: true,
        [`${prefix}__item--active`]: carouselState?.currentActive === state.label
      }
    })
    const style = computed(() => {
      const { width, height, offset } = state

      return {
        width: width ? `${width}px` : null,
        height: height ? `${height}px` : null,
        transform: offset ? `translate${carouselState?.vertical ? 'Y' : 'X'}(${offset}px)` : null
      }
    })

    if (carouselState) {
      carouselState.increaseItem(state)

      onBeforeUnmount(() => {
        carouselState.decreaseItem(state)
      })
    }

    return {
      className,
      style
    }
  }
})
</script>
