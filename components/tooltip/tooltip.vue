<template>
  <div
    ref="wrapper"
    :class="prefix"
    @mouseenter="handleTriggerEnter"
    @mouseleave="handleTriggerLeave"
    @clickoutside="handleClickOutside"
  >
    <div ref="reference" :class="`${prefix}__trigger`" @click="handleTriggerClick">
      <slot></slot>
    </div>
    <Portal v-if="!disabled" :to="transferTo">
      <transition :name="transitionName">
        <div
          v-show="currentVisible"
          ref="popper"
          :class="{
            [`${prefix}__popper`]: true,
            [`${prefix}__popper--${theme}`]: true,
            [`${prefix}__popper--no-hover`]: noHover
          }"
          @click.stop
          @mouseenter="handleTriggerEnter"
          @mouseleave="handleTriggerLeave"
        >
          <div :class="[`${prefix}__tip`, tipClass]">
            <div :class="`${prefix}__arrow`"></div>
            <slot name="tip"></slot>
          </div>
        </div>
      </transition>
    </Portal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, toRef } from 'vue'

import { Portal } from '@/components/portal'

import { useConfiguredProps } from '@vexip-ui/config'
import { useClickOutside, placementWhileList, usePopper } from '@vexip-ui/mixins'

import type { PropType } from 'vue'
import type { Placement } from '@vexip-ui/mixins'
import type { ClassType, TooltipTheme, ToopTipTrigger } from './symbol'

const props = useConfiguredProps('tooltip', {
  trigger: {
    default: 'hover' as ToopTipTrigger,
    validator: (value: ToopTipTrigger) => {
      return ['hover', 'click', 'custom'].includes(value)
    }
  },
  transitionName: {
    type: String,
    default: 'vxp-fade'
  },
  visible: {
    type: Boolean,
    default: false
  },
  placement: {
    type: String as PropType<Placement>,
    default: 'top',
    validator: (value: Placement) => {
      return placementWhileList.includes(value)
    }
  },
  outsideClose: {
    type: Boolean,
    default: true
  },
  // 设置 pointer-event: none
  noHover: {
    type: Boolean,
    default: false
  },
  tipClass: {
    type: [String, Object] as PropType<ClassType>,
    default: null
  },
  transfer: {
    type: [Boolean, String],
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  theme: {
    default: 'light' as TooltipTheme,
    validator: (value: TooltipTheme) => {
      return ['light', 'dark'].includes(value)
    }
  }
})

export default defineComponent({
  name: 'Tooltip',
  components: {
    Portal
  },
  props,
  emits: [
    'on-toggle',
    'on-click-outside',
    'on-outside-close',
    'on-tip-enter',
    'on-tip-leave',
    'update:visible'
  ],
  setup(props, { emit }) {
    const placement = toRef(props, 'placement')
    const currentVisible = ref(props.visible)
    const transfer = toRef(props, 'transfer')

    const wrapper = useClickOutside()
    const { reference, popper, transferTo, updatePopper } = usePopper({
      placement,
      transfer,
      wrapper
    })

    let hoverTimer: number

    watch(
      () => props.visible,
      value => {
        currentVisible.value = value
      }
    )

    watch(currentVisible, value => {
      if (value) {
        updatePopper()
      }

      emit('on-toggle', value)
      emit('update:visible', value)
    })

    watch(
      () => props.disabled,
      value => {
        if (value) {
          currentVisible.value = false
        }
      }
    )

    function handleTriggerEnter() {
      if (props.disabled) return

      if (props.trigger === 'hover') {
        window.clearTimeout(hoverTimer)

        hoverTimer = window.setTimeout(() => {
          currentVisible.value = true

          emit('on-tip-enter')
        }, 250)
      }
    }

    function handleTriggerLeave() {
      if (props.disabled) return

      if (props.trigger === 'hover') {
        window.clearTimeout(hoverTimer)

        hoverTimer = window.setTimeout(() => {
          currentVisible.value = false

          emit('on-tip-leave')
        }, 250)
      }
    }

    function handleTriggerClick() {
      if (props.disabled) return

      if (props.trigger === 'click') {
        currentVisible.value = !currentVisible.value
      }
    }

    function handleClickOutside() {
      if (props.disabled) return

      emit('on-click-outside')

      if (props.outsideClose && props.trigger !== 'custom' && currentVisible.value) {
        currentVisible.value = false

        emit('on-outside-close')
      }
    }

    return {
      prefix: 'vxp-tooltip',
      currentVisible,
      transferTo,

      wrapper,
      reference,
      popper,

      handleTriggerEnter,
      handleTriggerLeave,
      handleTriggerClick,
      handleClickOutside,

      updatePopper
    }
  }
})
</script>
