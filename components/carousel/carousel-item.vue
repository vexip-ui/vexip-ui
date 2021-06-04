<template>
  <div :class="className" :style="style" @click="handleClick">
    <slot :active="active"></slot>
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

    const active = computed(() => {
      return carouselState?.isItemActive(state.label) ?? false
    })
    const className = computed(() => {
      return {
        [`${prefix}__item`]: true,
        [`${prefix}__item--active`]: active.value
      }
    })
    const style = computed(() => {
      const { width, height, offset } = state

      return {
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
        transform: offset
          ? `translate${carouselState?.vertical ? 'Y' : 'X'}(${offset}px)`
          : undefined
      }
    })

    if (carouselState) {
      carouselState.increaseItem(state)

      onBeforeUnmount(() => {
        carouselState.decreaseItem(state)
      })
    }

    function handleClick() {
      carouselState?.handleSelect(state.label)
    }

    return {
      active,
      className,
      style,

      handleClick
    }
  }
})
</script>
