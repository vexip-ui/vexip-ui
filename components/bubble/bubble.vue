<template>
  <div :class="className" @click="handleClick">
    <div :class="[`${prefix}__content`, contentClass]" :style="contentStyle">
      <div :class="`${prefix}__arrow`" :style="arrowStyle"></div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { placementWhileList } from '@/common/mixins/popper'
import { useConfiguredProps } from '@/common/config/install'

import type { PropType, CSSProperties } from 'vue'
import type { Placement } from '@popperjs/core'

type ClassType = string | Record<string, boolean>

const props = useConfiguredProps('bubble', {
  placement: {
    default: 'right',
    validator: (value: Placement) => {
      return placementWhileList.includes(value)
    }
  },
  background: {
    type: String,
    default: ''
  },
  shadow: {
    type: [Boolean, String],
    default: false
  },
  contentClass: {
    type: [String, Object] as PropType<ClassType>,
    default: null
  }
})

export default defineComponent({
  name: 'Bubble',
  props,
  emits: ['on-click'],
  setup(props, { emit }) {
    const prefix = 'vxp-bubble'

    const className = computed(() => {
      return [
        prefix,
        `${prefix}--${props.placement}`,
        {
          [`${prefix}--background`]: props.background,
          [`${prefix}--shadow`]: props.shadow
        }
      ]
    })
    const contentStyle = computed(() => {
      const style: CSSProperties = {
        backgroundColor: props.background
      }

      if (typeof props.shadow === 'string') {
        style.boxShadow = `0 0 4px ${props.shadow}`
      }

      return style
    })
    const arrowStyle = computed(() => {
      const position = props.placement.split('-').shift()

      return {
        [`border-${position}-color`]: props.background
      }
    })

    function handleClick(event: MouseEvent) {
      emit('on-click', event)
    }

    return {
      prefix,

      className,
      contentStyle,
      arrowStyle,

      handleClick
    }
  }
})
</script>
