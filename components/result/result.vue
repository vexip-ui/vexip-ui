<template>
  <div :class="className">
    <div v-if="hasIcon" :class="nh.be('icon')">
      <slot name="icon">
        <Icon
          :class="nh.be('icon')"
          :style="{ color: props.iconColor }"
          :icon="iconComp"
        ></Icon>
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

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { Icon } from '@/components/icon'
import { useNameHelper, useProps, emitEvent, createSizeProp } from '@vexip-ui/config'
import {
  CircleInfo,
  CircleCheck,
  CircleExclamation,
  CircleXmark
} from '@vexip-ui/icons'
import { resultProps } from './props'
import type { ResultType } from './symbol'
const predefinedIcons = {
  info: CircleInfo,
  success: CircleCheck,
  warning: CircleExclamation,
  error: CircleXmark
}
const resultTypes = Object.freeze(['info', 'success', 'warning', 'error'])
export default defineComponent({
  name: 'Result',
  components: {
    Icon
  },
  props: resultProps,
  setup(_props, { slots }) {
    const props = useProps('result', _props, {
      title: '',
      type: {
        default: 'info' as ResultType,
        validator: (value: ResultType) => resultTypes.includes(value)
      },
      size: createSizeProp(),
      iconColor: '',
      description: ''
    })

    const nh = useNameHelper('result')

    const iconComp = computed(() => {
      return predefinedIcons[props.type] ?? null
    })
    const hasTitle = computed(() => {
      return slots.title || props.title
    })
    const hasIcon = computed(() => {
      return slots.icon || props.type
    })
    const hasDescription = computed(() => {
      return slots.description || props.description
    })
    const className = computed(() => {
      return {
        [nh.b()]: true,
        [nh.bs('vars')]: true,
        [nh.bm('inherit')]: props.inherit,
        [nh.bm(props.type)]: props.type,
        [nh.bm(props.size)]: props.size !== 'default'
      }
    })
    return {
      props,
      nh,
      className,
      iconComp,
      hasTitle,
      hasIcon,
      hasDescription
    }
  }
})
</script>
