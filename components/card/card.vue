<script setup lang="ts">
import { computed } from 'vue'

import { useNameHelper, useProps } from '@vexip-ui/config'
import { cardProps } from './props'

import type { CardShadowType } from './symbol'

defineOptions({ name: 'Card' })

const _props = defineProps(cardProps)
const props = useProps('card', _props, {
  title: '',
  shadow: {
    default: 'always' as CardShadowType,
    validator: (value: CardShadowType) => ['always', 'hover', 'never'].includes(value)
  },
  contentStyle: () => ({})
})

const slots = defineSlots<{
  default: () => any,
  header: () => any,
  title: () => any,
  extra: () => any
}>()

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
const hasTitle = computed(() => !!slots.title || props.title)
const hasExtra = computed(() => !!slots.extra)
const hasHeader = computed(() => !!slots.header || hasTitle.value || hasExtra.value)
</script>

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
