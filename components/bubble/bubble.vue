<script setup lang="ts">
import { computed, ref } from 'vue'

import { placementWhileList } from '@vexip-ui/hooks'
import { useNameHelper, useProps } from '@vexip-ui/config'
import { bubbleProps } from './props'
import { bubbleTypes } from './symbol'

defineOptions({ name: 'Bubble' })

const _props = defineProps(bubbleProps)
const props = useProps('bubble', _props, {
  placement: {
    default: 'right',
    validator: value => placementWhileList.includes(value)
  },
  type: {
    default: null,
    validator: value => bubbleTypes.includes(value)
  },
  background: '',
  shadow: false,
  contentClass: null
})

const nh = useNameHelper('bubble')

const wrapper = ref<HTMLElement>()
const arrow = ref<HTMLElement>()

const className = computed(() => {
  return [
    nh.b(),
    nh.bs('vars'),
    nh.bm(props.placement),
    {
      [nh.bm('inherit')]: props.inherit,
      [nh.bm('background')]: props.background,
      [nh.bm('shadow')]: props.shadow,
      [nh.bm(props.type)]: props.type !== 'default'
    }
  ]
})
const style = computed(() => {
  if (props.background) {
    return {
      [nh.cv('color')]: nh.gnv('color-white'),
      [nh.cv('bg-color')]: props.background
    }
  }

  return undefined
})

defineExpose({ wrapper, arrow })
</script>

<template>
  <div ref="wrapper" :class="className" :style="style">
    <div
      :class="[nh.be('content'), props.contentClass]"
      :style="{
        boxShadow: props.shadow ? `0 0 4px ${props.shadow}` : undefined
      }"
    >
      <div ref="arrow" :class="nh.be('arrow')"></div>
      <slot></slot>
    </div>
  </div>
</template>
