<script setup lang="ts">
import { Icon } from '@/components/icon'

import { computed } from 'vue'

import { createIconProp, emitEvent, useNameHelper, useProps } from '@vexip-ui/config'
import { linkerProps } from './props'

import type { LinkerType } from './symbol'

const linkerTypes = Object.freeze<LinkerType[]>([
  'default',
  'primary',
  'success',
  'error',
  'warning',
  'info'
])

defineOptions({ name: 'Linker' })

const _props = defineProps(linkerProps)
const props = useProps('linker', _props, {
  to: {
    default: null,
    static: true
  },
  type: {
    default: 'default' as LinkerType,
    validator: (value: LinkerType) => linkerTypes.includes(value)
  },
  icon: createIconProp(),
  underline: false,
  disabled: false,
  target: '_blank'
})

const nh = useNameHelper('linker')

const className = computed(() => {
  return {
    [nh.b()]: true,
    [nh.bs('vars')]: true,
    [nh.bm('inherit')]: props.inherit,
    [nh.bm(props.type)]: props.type !== 'default',
    [nh.bm('disabled')]: props.disabled,
    [nh.bm('underline')]: props.underline
  }
})

function handleClick(event: MouseEvent) {
  if (props.disabled) {
    event.preventDefault()
  }

  emitEvent(props.onClick, event)
}
</script>

<template>
  <a
    :class="className"
    :href="props.to"
    tabindex="0"
    :target="props.target"
    @click="handleClick"
  >
    <slot name="icon">
      <Icon v-if="props.icon" :class="nh.be('icon')" :icon="props.icon"></Icon>
    </slot>
    <slot></slot>
  </a>
</template>
