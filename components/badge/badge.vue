<template>
  <div :class="className">
    <slot></slot>
    <transition :name="transitionName">
      <sup
        v-show="showSub"
        :class="{
          [`${prefix}__content`]: true,
          [`${prefix}__content--fixed`]: hasSlot,
          [`${prefix}__content--${props.type}`]: props.type !== 'error'
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
import { useProps, booleanProp } from '@vexip-ui/config'

import type { PropType } from 'vue'

export type BadgeType = 'error' | 'primary' | 'success' | 'warning' | 'info' | 'disabled'

const badgeTypes = Object.freeze(['error', 'primary', 'success', 'warning', 'info', 'disabled'] as BadgeType[])

export default defineComponent({
  name: 'Badge',
  props: {
    content: [Number, String],
    max: Number,
    disabled: booleanProp,
    isDot: booleanProp,
    type: String as PropType<BadgeType>,
    color: String
  },
  emits: ['badge-click'],
  setup(_props, { slots, emit }) {
    const props = useProps('badge', _props, {
      content: {
        default: null,
        static: true
      },
      max: 0,
      disabled: false,
      isDot: false,
      type: {
        default: 'error' as BadgeType,
        validator: (value: BadgeType) => badgeTypes.includes(value)
      },
      color: null
    })

    const prefix = 'vxp-badge'

    const hasSlot = computed(() => {
      return !!slots.default
    })
    const className = computed(() => {
      return {
        [prefix]: true,
        [`${prefix}-vars`]: true,
        [`${prefix}--not-wrapper`]: !hasSlot.value,
        [`${prefix}--is-dot`]: props.isDot
      }
    })
    const renderContent = computed(() => {
      if (props.isDot) return ''

      if (typeof props.content === 'number' && props.max) {
        return props.content > props.max ? `${props.max}+` : props.content
      }

      return props.content
    })
    const transitionName = computed(() => {
      return hasSlot.value ? `${prefix}-badge-zoom` : `${prefix}-zoom`
    })
    const title = computed(() => {
      return props.content || props.content === 0 ? props.content.toString() : undefined
    })
    const showSub = computed(() => {
      return !props.disabled && (props.content || props.content === 0 || props.isDot)
    })

    function handleBadgeClick() {
      emit('badge-click')
    }

    return {
      props,
      prefix,

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
