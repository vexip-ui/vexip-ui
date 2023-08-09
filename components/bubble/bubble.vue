<template>
  <div :class="className">
    <div :class="[nh.be('content'), props.contentClass]" :style="contentStyle">
      <div ref="arrow" :class="nh.be('arrow')" :style="arrowStyle"></div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import { placementWhileList } from '@vexip-ui/hooks'
import { useNameHelper, useProps } from '@vexip-ui/config'
import { bubbleProps } from './props'

import type { CSSProperties } from 'vue'

export default defineComponent({
  name: 'Bubble',
  props: bubbleProps,
  setup(_props) {
    const props = useProps('bubble', _props, {
      placement: {
        default: 'right',
        validator: value => placementWhileList.includes(value)
      },
      background: '',
      shadow: false,
      contentClass: null
    })

    const nh = useNameHelper('bubble')

    const arrow = ref<HTMLElement>()

    const className = computed(() => {
      return [
        nh.b(),
        nh.bs('vars'),
        nh.bm(props.placement),
        {
          [nh.bm('inherit')]: props.inherit,
          [nh.bm('background')]: props.background,
          [nh.bm('shadow')]: props.shadow
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

    return {
      props,
      nh,

      className,
      contentStyle,
      arrowStyle,

      arrow
    }
  }
})
</script>
