<template>
  <button
    type="button"
    :class="className"
    :style="style"
    :disabled="disabled"
    @click.left="handleClick"
    @animationend="handleAnimationEnd"
  >
    <div v-if="loading" :class="`${prefix}__icon`">
      <slot name="loading">
        <Icon spin :name="loadingIcon"></Icon>
      </slot>
    </div>
    <div v-if="icon && !loading" :class="`${prefix}__icon`">
      <Icon :name="icon"></Icon>
    </div>
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { Icon } from '@/components/icon'
import { createSizeProp } from '@/common/config/props'
import { useConfiguredProps } from '@/common/config/install'

import type { ButtonType } from './symbol'

import '@/common/icons/spinner'

const props = useConfiguredProps('button', {
  size: createSizeProp(),
  type: {
    default: 'default' as ButtonType,
    validator(value: ButtonType) {
      return [
        'default',
        'primary',
        'dashed',
        'text',
        'info',
        'success',
        'warning',
        'error'
      ].includes(value)
    }
  },
  ghost: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  circle: {
    type: Boolean,
    default: false
  },
  loadingIcon: {
    type: String,
    default: 'spinner'
  },
  icon: {
    type: String,
    default: ''
  },
  textColor: {
    type: String,
    default: null
  }
})

export default defineComponent({
  name: 'Button',
  components: {
    Icon
  },
  props,
  emits: ['on-click'],
  setup(props, { emit, slots }) {
    const prefix = 'vxp-button'
    const pulsing = ref(false)
    const isIconOnly = computed(() => {
      return typeof slots.default !== 'function'
    })
    const className = computed(() => {
      return {
        [prefix]: true,
        [`${prefix}--${props.type}`]: props.type !== 'default',
        [`${prefix}--ghost`]: props.ghost,
        [`${prefix}--disabled`]: props.disabled,
        [`${prefix}--loading`]: props.loading,
        [`${prefix}--circle`]: props.circle,
        [`${prefix}--icon-only`]: isIconOnly.value,
        [`${prefix}--${props.size}`]: props.size !== 'default',
        [`${prefix}--pulsing`]: pulsing.value
      }
    })
    const style = computed(() => {
      return { color: props.textColor }
    })

    function handleClick(event: MouseEvent) {
      pulsing.value = false

      requestAnimationFrame(() => {
        pulsing.value = true
      })

      emit('on-click', event)
    }

    function handleAnimationEnd() {
      pulsing.value = false
    }

    return {
      prefix,
      className,
      style,

      handleClick,
      handleAnimationEnd
    }
  }
})
</script>
