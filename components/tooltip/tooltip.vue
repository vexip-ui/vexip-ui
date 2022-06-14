<template>
  <div
    ref="wrapper"
    :class="[prefix, `${prefix}-vars`]"
    @mouseenter="handleTriggerEnter"
    @mouseleave="handleTriggerLeave"
    @clickoutside="handleClickOutside"
  >
    <div ref="reference" :class="`${prefix}__trigger`" @click="handleTriggerClick">
      <slot></slot>
    </div>
    <Portal v-if="!props.disabled" :to="transferTo">
      <transition :name="props.transitionName">
        <div
          v-if="rendering"
          v-show="currentVisible"
          ref="popper"
          :class="{
            [`${prefix}__popper`]: true,
            [`${prefix}-vars`]: true,
            [`${prefix}__popper--${props.theme}`]: true,
            [`${prefix}__popper--no-hover`]: props.noHover
          }"
          @click.stop
          @mouseenter="handleTriggerEnter"
          @mouseleave="handleTriggerLeave"
          @animationend="rendering = currentVisible"
        >
          <div :class="[`${prefix}__tip`, props.tipClass]">
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
import { useProps, booleanProp, booleanStringProp } from '@vexip-ui/config'
import { useClickOutside, placementWhileList, usePopper, useSetTimeout } from '@vexip-ui/mixins'

import type { PropType } from 'vue'
import type { Placement } from '@vexip-ui/mixins'
import type { ClassType, TooltipTheme, ToopTipTrigger } from './symbol'

export default defineComponent({
  name: 'Tooltip',
  components: {
    Portal
  },
  props: {
    trigger: String as PropType<ToopTipTrigger>,
    transitionName: String,
    visible: booleanProp,
    placement: String as PropType<Placement>,
    outsideClose: booleanProp,
    // 设置 pointer-event: none
    noHover: booleanProp,
    tipClass: [String, Object] as PropType<ClassType>,
    transfer: booleanStringProp,
    disabled: booleanProp,
    theme: String as PropType<TooltipTheme>
  },
  emits: [
    'toggle',
    'click-outside',
    'outside-close',
    'tip-enter',
    'tip-leave',
    'update:visible'
  ],
  setup(_props, { emit }) {
    const props = useProps('tooltip', _props, {
      trigger: {
        default: 'hover' as ToopTipTrigger,
        validator: (value: ToopTipTrigger) => ['hover', 'click', 'custom'].includes(value)
      },
      transitionName: 'vxp-fade',
      visible: false,
      placement: {
        default: 'top',
        validator: (value: Placement) => placementWhileList.includes(value)
      },
      outsideClose: true,
      // 设置 pointer-event: none
      noHover: false,
      tipClass: null,
      transfer: false,
      disabled: false,
      theme: {
        default: 'light' as TooltipTheme,
        validator: (value: TooltipTheme) => ['light', 'dark'].includes(value)
      }
    })

    const placement = toRef(props, 'placement')
    const currentVisible = ref(props.visible)
    const rendering = ref(props.visible)
    const transfer = toRef(props, 'transfer')

    const wrapper = useClickOutside()
    const { reference, popper, transferTo, updatePopper } = usePopper({
      placement,
      transfer,
      wrapper
    })

    const { timer } = useSetTimeout()

    watch(
      () => props.visible,
      value => {
        currentVisible.value = value
      }
    )

    watch(currentVisible, value => {
      if (value) {
        rendering.value = true
        updatePopper()
      }

      emit('toggle', value)
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
        window.clearTimeout(timer.hover)

        timer.hover = window.setTimeout(() => {
          currentVisible.value = true
        }, 250)
      }

      emit('tip-enter')
    }

    function handleTriggerLeave() {
      if (props.disabled) return

      if (props.trigger === 'hover') {
        window.clearTimeout(timer.hover)

        timer.hover = window.setTimeout(() => {
          currentVisible.value = false
        }, 250)
      }

      emit('tip-leave')
    }

    function handleTriggerClick() {
      if (props.disabled) return

      if (props.trigger === 'click') {
        currentVisible.value = !currentVisible.value
      }
    }

    function handleClickOutside() {
      if (props.disabled) return

      emit('click-outside')

      if (props.outsideClose && props.trigger !== 'custom' && currentVisible.value) {
        currentVisible.value = false

        emit('outside-close')
      }
    }

    return {
      props,
      prefix: 'vxp-tooltip',
      currentVisible,
      rendering,
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
