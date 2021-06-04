<template>
  <transition :name="transitionName">
    <div :class="className" :style="style" @click="$emit('on-click', $event)">
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
        <Icon name="times" :scale="0.8"></Icon>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { Icon } from '@/components/icon'
import { useConfiguredProps } from '@/common/config/install'

import '@/common/icons/times'

export type TagType = 'default' | 'primary' | 'success' | 'error' | 'warning'

const props = useConfiguredProps('tag', {
  type: {
    default: 'default' as TagType,
    validator: (value: TagType) => {
      return ['default', 'primary', 'success', 'error', 'warning'].includes(value)
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
  }
})

export default defineComponent({
  name: 'Tag',
  components: {
    Icon
  },
  props,
  emits: ['on-click', 'on-close'],
  setup(props, { emit }) {
    const prefix = 'vxp-tag'

    const className = computed(() => {
      return {
        [prefix]: true,
        [`${prefix}--${props.type}`]: props.type !== 'default',
        [`${prefix}--border`]: props.border
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
        emit('on-close')
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
