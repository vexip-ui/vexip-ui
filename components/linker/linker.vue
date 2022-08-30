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

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { Icon } from '@/components/icon'
import { useNameHelper, useProps, booleanProp, eventProp, emitEvent } from '@vexip-ui/config'

import type { PropType } from 'vue'

export type LinkerType = 'default' | 'primary' | 'success' | 'error' | 'warning' | 'info'

const linkerTypes = Object.freeze<LinkerType>([
  'default',
  'primary',
  'success',
  'error',
  'warning',
  'info'
])

export default defineComponent({
  name: 'Linker',
  components: {
    Icon
  },
  props: {
    to: String,
    type: String as PropType<LinkerType>,
    icon: Object,
    underline: booleanProp,
    disabled: booleanProp,
    target: String,
    onClick: eventProp<(event: MouseEvent) => void>()
  },
  setup(_props) {
    const props = useProps('linker', _props, {
      to: {
        default: null,
        static: true
      },
      type: {
        default: 'default' as LinkerType,
        validator: (value: LinkerType) => linkerTypes.includes(value)
      },
      icon: null,
      underline: false,
      disabled: false,
      target: '_blank'
    })

    const nh = useNameHelper('linker')

    const className = computed(() => {
      return {
        [nh.b()]: true,
        [nh.bs('vars')]: true,
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

    return {
      props,
      nh,

      className,

      handleClick
    }
  }
})
</script>
