<script setup lang="ts">
import { Renderer } from '@/components/renderer'

import { computed } from 'vue'

import { useNameHelper, useProps } from '@vexip-ui/config'
import { cardProps } from './props'

import type { CardShadowType, CardSlots } from './symbol'

defineOptions({ name: 'Card' })

const _props = defineProps(cardProps)
const props = useProps('card', _props, {
  title: '',
  shadow: {
    default: 'always' as CardShadowType,
    validator: (value: CardShadowType) => ['always', 'hover', 'never'].includes(value),
  },
  contentStyle: () => ({}),
  slots: () => ({}),
})

const slots = defineSlots<CardSlots>()

const nh = useNameHelper('card')

const className = computed(() => {
  return [
    nh.b(),
    nh.bs('vars'),
    nh.bm(`shadow-${props.shadow}`),
    {
      [nh.bm('inherit')]: props.inherit,
    },
  ]
})
const hasTitle = computed(() => !!(slots.title || props.title || props.slots.title))
const hasExtra = computed(() => !!(slots.extra || props.slots.extra))
const hasHeader = computed(() => !!slots.header || hasTitle.value || hasExtra.value)
</script>

<template>
  <article :class="className">
    <div v-if="hasHeader" :class="nh.be('header')">
      <slot name="header">
        <Renderer :renderer="props.slots.header">
          <div v-if="hasTitle" :class="nh.be('title')">
            <slot name="title">
              <Renderer :renderer="props.slots.title">
                {{ props.title }}
              </Renderer>
            </slot>
          </div>
          <div v-if="hasExtra" :class="nh.be('extra')">
            <slot name="extra">
              <Renderer :renderer="props.slots.extra"></Renderer>
            </slot>
          </div>
        </Renderer>
      </slot>
    </div>
    <div :class="nh.be('content')" :style="props.contentStyle">
      <slot>
        <Renderer :renderer="props.slots.default"></Renderer>
      </slot>
    </div>
  </article>
</template>
