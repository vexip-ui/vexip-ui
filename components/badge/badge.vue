<template>
  <div :class="className">
    <slot></slot>
    <transition :name="transitionName">
      <sup
        v-show="showSub"
        :class="{
          [nh.be('content')]: true,
          [nh.bem('content', 'fixed')]: hasSlot,
          [nh.bem('content', props.type)]: props.type !== 'error'
        }"
        :style="{ backgroundColor: props.color }"
        :title="title"
        @click="handleBadgeClick"
      >
        <slot name="content">
          {{ renderContent }}
        </slot>
      </sup>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useNameHelper, useProps, emitEvent } from '@vexip-ui/config'
import { badgeProps } from './props'

import type { BadgeType } from './symbol'

const badgeTypes = Object.freeze<BadgeType[]>([
  'error',
  'primary',
  'success',
  'warning',
  'info',
  'disabled'
])

export default defineComponent({
  name: 'Badge',
  props: badgeProps,
  emits: [],
  setup(_props, { slots }) {
    const props = useProps('badge', _props, {
      content: {
        default: null,
        static: true
      },
      max: 0,
      disabled: false,
      isDot: false,
      type: {
        default: 'error',
        validator: value => badgeTypes.includes(value)
      },
      color: null
    })

    const nh = useNameHelper('badge')

    const hasSlot = computed(() => {
      return !!slots.default
    })
    const className = computed(() => {
      return {
        [nh.b()]: true,
        [nh.bs('vars')]: true,
        [nh.bm('inherit')]: props.inherit,
        [nh.bm('not-wrapper')]: !hasSlot.value,
        [nh.bm('is-dot')]: props.isDot
      }
    })
    const renderContent = computed(() => {
      if (props.isDot) return ''

      if (typeof props.content === 'number' && props.max > 0) {
        return props.content > props.max ? `${props.max}+` : props.content
      }

      return props.content
    })
    const transitionName = computed(() => {
      return hasSlot.value ? nh.bs('badge-zoom') : nh.bs('zoom')
    })
    const title = computed(() => {
      return props.content || props.content === 0 ? props.content.toString() : undefined
    })
    const showSub = computed(() => {
      return !props.disabled && (props.content || props.content === 0 || props.isDot)
    })

    function handleBadgeClick(event: MouseEvent) {
      emitEvent(props.onBadgeClick, event)
    }

    return {
      props,
      nh,

      hasSlot,
      className,
      renderContent,
      transitionName,
      title,
      showSub,

      handleBadgeClick
    }
  }
})
</script>
