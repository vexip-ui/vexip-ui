<template>
  <div :class="className">
    <slot></slot>
    <transition :name="transitionName">
      <sup
        v-show="!disabled && (content || content === 0 || isDot)"
        :class="{
          [`${prefix}__content`]: true,
          [`${prefix}__content--fixed`]: hasSlot,
          [`${prefix}__content--${type}`]: type !== 'error'
        }"
        :style="{ backgroundColor: color }"
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
import { useConfiguredProps } from '@vexip-ui/config'

export type BadgeType = 'error' | 'primary' | 'success' | 'warning' | 'info' | 'disabled'

const props = useConfiguredProps('badge', {
  content: {
    type: [Number, String],
    default: null
  },
  max: {
    type: Number,
    default: 0
  },
  disabled: {
    type: Boolean,
    default: false
  },
  isDot: {
    type: Boolean,
    default: false
  },
  type: {
    default: 'error' as BadgeType,
    validator: (value: BadgeType) => {
      return ['error', 'primary', 'success', 'warning', 'info', 'disabled'].includes(value)
    }
  },
  color: {
    type: String,
    default: null
  }
})

export default defineComponent({
  name: 'Badge',
  props,
  emits: ['badge-click'],
  setup(props, { slots, emit }) {
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

    function handleBadgeClick() {
      emit('badge-click')
    }

    return {
      prefix,

      hasSlot,
      className,
      renderContent,
      transitionName,
      title,

      handleBadgeClick
    }
  }
})
</script>
