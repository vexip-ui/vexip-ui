<template>
  <button
    type="button"
    :class="className"
    :style="style"
    :disabled="disabled"
    @click.left="handleClick"
    @animationend="handleAnimationEnd"
  >
    <template v-if="icon">
      <div v-if="loading" :class="[`${prefix}__icon`, `${prefix}__icon--loading`]">
        <slot name="loading">
          <Icon v-if="loadingSpin" spin :name="loadingIcon"></Icon>
          <Icon v-else pulse :name="loadingIcon"></Icon>
        </slot>
      </div>
      <div v-else :class="`${prefix}__icon`">
        <Icon :name="icon"></Icon>
      </div>
    </template>
    <CollapseTransition
      v-else
      appear
      horizontal
      fade-effect
    >
      <div v-if="loading" :class="[`${prefix}__icon`, `${prefix}__icon--loading`]">
        <slot name="loading">
          <Icon v-if="loadingSpin" spin :name="loadingIcon"></Icon>
          <Icon v-else pulse :name="loadingIcon"></Icon>
        </slot>
      </div>
    </CollapseTransition>
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { CollapseTransition } from '@/components/collapse-transition'
import { Icon } from '@/components/icon'
import { createSizeProp, useConfiguredProps } from '@vexip-ui/config'

import type { ButtonType } from './symbol'

import '@/common/icons/spinner'

const props = useConfiguredProps('button', {
  size: createSizeProp(),
  type: {
    default: 'default' as ButtonType,
    validator: (value: ButtonType) => {
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
  simple: {
    type: Boolean,
    default: false
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
  loadingSpin: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: ''
  },
  textColor: {
    type: String,
    default: null
  },
  buttonType: {
    type: String,
    default: 'button'
  },
  block: {
    type: Boolean,
    default: false
  }
})

export default defineComponent({
  name: 'Button',
  components: {
    CollapseTransition,
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
        [`${prefix}--simple`]: !props.ghost && props.simple,
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
      if (props.disabled) return

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
