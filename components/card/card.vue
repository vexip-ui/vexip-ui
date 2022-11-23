<template>
  <article :class="className">
    <div v-if="hasHeader" :class="nh.be('header')">
      <slot name="header">
        <div v-if="hasTitle" :class="nh.be('title')">
          <slot name="title">
            {{ props.title }}
          </slot>
        </div>
        <div v-if="hasExtra" :class="nh.be('extra')">
          <slot name="extra"></slot>
        </div>
      </slot>
    </div>
    <div :class="nh.be('content')" :style="props.contentStyle">
      <slot></slot>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useNameHelper, useProps } from '@vexip-ui/config'
import { cardProps } from './props'

export type CardShadowType = 'always' | 'hover' | 'never'

export default defineComponent({
  name: 'Card',
  props: cardProps,
  setup(_props, { slots }) {
    const props = useProps('card', _props, {
      title: '',
      shadow: {
        default: 'always' as CardShadowType,
        validator: (value: CardShadowType) => ['always', 'hover', 'never'].includes(value)
      },
      contentStyle: () => ({})
    })

    const nh = useNameHelper('card')

    const className = computed(() => {
      return [
        nh.b(),
        nh.bs('vars'),
        nh.bm(`shadow-${props.shadow}`),
        {
          [nh.bm('inherit')]: props.inherit
        }
      ]
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
      nh,

      className,
      hasTitle,
      hasExtra,
      hasHeader
    }
  }
})
</script>
