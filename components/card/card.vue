<template>
  <div :class="className">
    <div v-if="hasHeader" :class="`${prefix}__header`">
      <slot name="header">
        <div v-if="hasTitle" :class="`${prefix}__title`">
          <slot name="title">
            {{ title }}
          </slot>
        </div>
        <div v-if="hasExtra" :class="`${prefix}__extra`">
          <slot name="extra"></slot>
        </div>
      </slot>
    </div>
    <div :class="`${prefix}__content`" :style="contentStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useConfiguredProps } from '@vexip-ui/config'

export type CardShadowType = 'always' | 'hover' | 'never'

const props = useConfiguredProps('card', {
  title: {
    type: String,
    default: ''
  },
  shadow: {
    default: 'always' as CardShadowType,
    validator: (value: CardShadowType) => {
      return ['always', 'hover', 'never'].includes(value)
    }
  },
  contentStyle: {
    type: Object,
    default: () => ({})
  }
})

export default defineComponent({
  name: 'Card',
  props,
  setup(props, { slots }) {
    const prefix = 'vxp-card'

    const className = computed(() => {
      return [prefix, `${prefix}--shadow-${props.shadow}`]
    })
    const hasTitle = computed(() => {
      return slots.title || props.title
    })
    const hasExtra = computed(() => {
      return slots.extra
    })
    const hasHeader = computed(() => {
      return slots.header || hasTitle.value || hasExtra.value
    })

    return {
      prefix,

      className,
      hasTitle,
      hasExtra,
      hasHeader
    }
  }
})
</script>
