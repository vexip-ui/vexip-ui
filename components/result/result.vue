<script setup lang="ts">
import { Icon } from '@/components/icon'

import { computed } from 'vue'

import { createIconProp, createSizeProp, useIcons, useNameHelper, useProps } from '@vexip-ui/config'
import { resultProps } from './props'
import { resultTypes } from './symbol'

defineOptions({ name: 'Result' })

const _props = defineProps(resultProps)
const props = useProps('result', _props, {
  title: '',
  size: createSizeProp(),
  type: {
    default: 'primary',
    validator: value => resultTypes.includes(value)
  },
  icon: createIconProp(),
  iconColor: '',
  description: ''
})

const slots = defineSlots<{
  icon: () => any,
  title: () => any,
  description: () => any,
  extra: () => any
}>()

const nh = useNameHelper('result')
const icons = useIcons()

const predefinedIcons = computed(() => ({
  primary: icons.value.info,
  info: icons.value.info,
  success: icons.value.success,
  warning: icons.value.warning,
  error: icons.value.error
}))

const iconComp = computed(() => {
  return props.icon ? { icon: props.icon } : predefinedIcons.value[props.type]
})
const hasTitle = computed(() => !!slots.title || props.title)
const hasIcon = computed(() => !!slots.icon || props.type || props.icon)
const hasDescription = computed(() => !!slots.description || props.description)
const className = computed(() => {
  return {
    [nh.b()]: true,
    [nh.bs('vars')]: true,
    [nh.bm('inherit')]: props.inherit,
    [nh.bm(props.type)]: props.type,
    [nh.bm(props.size)]: props.size !== 'default'
  }
})
const style = computed(() => {
  if (props.iconColor) {
    return nh.cvm({
      'icon-color': props.iconColor
    })
  }

  return {}
})
</script>

<template>
  <div :class="className" :style="style">
    <div v-if="hasIcon" :class="nh.be('icon')">
      <slot name="icon">
        <Icon v-bind="iconComp" :class="nh.be('icon')" :style="{ color: props.iconColor }"></Icon>
      </slot>
    </div>
    <div v-if="hasTitle" :class="nh.be('title')">
      <slot name="title">
        {{ props.title }}
      </slot>
    </div>
    <div v-if="hasDescription" :class="nh.be('description')">
      <slot name="description">
        {{ props.description }}
      </slot>
    </div>
    <div v-if="$slots.extra" :class="nh.be('extra')">
      <slot name="extra">
      </slot>
    </div>
  </div>
</template>
