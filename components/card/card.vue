<template>
  <div :class="className">
    <div v-if="hasHeader" :class="`${prefix}__header`">
      <slot name="header">
        <div v-if="hasTitle" :class="`${prefix}__title`">
          <slot name="title">
            {{ props.title }}
          </slot>
        </div>
        <div v-if="hasExtra" :class="`${prefix}__extra`">
          <slot name="extra"></slot>
        </div>
      </slot>
    </div>
    <div :class="`${prefix}__content`" :style="props.contentStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useProps } from '@vexip-ui/config'

import type { PropType } from 'vue'

export type CardShadowType = 'always' | 'hover' | 'never'

export default defineComponent({
  name: 'Card',
  props: {
    title: String,
    shadow: String as PropType<CardShadowType>,
    contentStyle: Object
  },
  setup(_props, { slots }) {
    const props = useProps('card', _props, {
      title: '',
      shadow: {
        default: 'always' as CardShadowType,
        validator: (value: CardShadowType) => ['always', 'hover', 'never'].includes(value)
      },
      contentStyle: () => ({})
    })

    const prefix = 'vxp-card'

    const className = computed(() => {
      return [prefix, `${prefix}-vars`, `${prefix}--shadow-${props.shadow}`]
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
      props,
      prefix,

      className,
      hasTitle,
      hasExtra,
      hasHeader
    }
  }
})
</script>
