<template>
  <div :class="className" @click="handleClick">
    <div :class="[nh.be('content'), props.contentClass]" :style="contentStyle">
      <div :class="nh.be('arrow')" :style="arrowStyle"></div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { placementWhileList } from '@vexip-ui/mixins'
import { useNameHelper, useProps, booleanStringProp, classProp } from '@vexip-ui/config'

import type { PropType, CSSProperties } from 'vue'
import type { Placement } from '@vexip-ui/mixins'

export default defineComponent({
  name: 'Bubble',
  props: {
    placement: String as PropType<Placement>,
    background: String,
    shadow: booleanStringProp,
    contentClass: classProp
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

    const nh = useNameHelper('bubble')

    const className = computed(() => {
      return [
        nh.b(),
        nh.bs('vars'),
        nh.bm(props.placement),
        {
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

    function handleClick(event: MouseEvent) {
      emit('click', event)
    }

    return {
      props,
      nh,

      className,
      contentStyle,
      arrowStyle,

      handleClick
    }
  }
})
</script>
