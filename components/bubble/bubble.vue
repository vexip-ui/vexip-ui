<template>
  <div :class="className" @click="handleClick">
    <div :class="[`${prefix}__content`, props.contentClass]" :style="contentStyle">
      <div :class="`${prefix}__arrow`" :style="arrowStyle"></div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { placementWhileList } from '@vexip-ui/mixins'
import { useProps, booleanStringProp } from '@vexip-ui/config'

import type { PropType, CSSProperties } from 'vue'
import type { Placement } from '@vexip-ui/mixins'

type ClassType = string | Record<string, boolean>

export default defineComponent({
  name: 'Bubble',
  props: {
    placement: String as PropType<Placement>,
    background: String,
    shadow: booleanStringProp,
    contentClass: [String, Object] as PropType<ClassType>
  },
  emits: ['click'],
  setup(_props, { emit }) {
    const props = useProps('bubble', _props, {
      placement: {
        default: 'right',
        validator: (value: Placement) => placementWhileList.includes(value)
      },
      background: '',
      shadow: false,
      contentClass: null
    })

    const prefix = 'vxp-bubble'

    const className = computed(() => {
      return [
        prefix,
        `${prefix}-vars`,
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
      emit('click', event)
    }

    return {
      props,
      prefix,

      className,
      contentStyle,
      arrowStyle,

      handleClick
    }
  }
})
</script>
