<template>
  <transition :name="transitionName">
    <div :class="className" :style="style" @click="$emit('click', $event)">
      <span>
        <slot></slot>
      </span>
      <div
        v-if="closable"
        :class="`${prefix}__close`"
        :style="{
          color: border ? borderColor || color : undefined
        }"
        @click.left.stop="handleClose"
      >
        <Icon :scale="0.8">
          <Xmark></Xmark>
        </Icon>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { Icon } from '@/components/icon'
import { useConfiguredProps, createSizeProp } from '@vexip-ui/config'
import { Xmark } from '@vexip-ui/icons'

import type { TagType } from './symbol'

const types = [
  'default',
  'primary',
  'info',
  'success',
  'error',
  'warning',
  'lime',
  'pink',
  'magenta',
  'tomato',
  'orange',
  'cyan',
  'navy',
  'gold',
  'purple'
]

const props = useConfiguredProps('tag', {
  size: createSizeProp(),
  type: {
    default: 'default' as TagType,
    validator: (value: TagType) => {
      return types.includes(value)
    }
  },
  border: {
    type: Boolean,
    default: false
  },
  closable: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: null
  },
  borderColor: {
    type: String,
    default: null
  },
  transitionName: {
    type: String,
    default: 'vxp-fade'
  },
  simple: {
    type: Boolean,
    default: false
  },
  circle: {
    type: Boolean,
    default: false
  }
})

export default defineComponent({
  name: 'Tag',
  components: {
    Icon,
    Xmark
  },
  props,
  emits: ['click', 'close'],
  setup(props, { emit }) {
    const prefix = 'vxp-tag'

    const className = computed(() => {
      return {
        [prefix]: true,
        [`${prefix}-vars`]: true,
        [`${prefix}--${props.size}`]: props.size !== 'default',
        [`${prefix}--${props.type}`]: props.type,
        [`${prefix}--border`]: props.border,
        [`${prefix}--simple`]: props.simple,
        [`${prefix}--circle`]: props.circle
      }
    })
    const style = computed(() => {
      return {
        color: props.border ? props.color : undefined,
        backgroundColor: props.border ? undefined : props.color,
        borderColor: props.borderColor || props.color
      }
    })

    function handleClose() {
      if (props.closable) {
        emit('close')
      }
    }

    return {
      prefix,

      className,
      style,

      handleClose
    }
  }
})
</script>
