<template>
  <div
    ref="wrapper"
    :class="prefix"
    v-bind="$attrs"
    @mouseenter="handleTriggerEnter"
    @mouseleave="handleTriggerLeave"
  >
    <slot></slot>
  </div>
  <Portal v-if="visible" :to="transferTo">
    <transition :name="props.transitionName" appear @after-leave="visible = false">
      <div
        v-show="active"
        ref="popper"
        :class="{
          [`${tooltipPrefix}__popper`]: true,
          [`${tooltipPrefix}-vars`]: true,
          [`${tooltipPrefix}__popper--${props.tooltipTheme}`]: true,
          [`${tooltipPrefix}__popper--no-hover`]: props.noHover
        }"
        @click.stop
        @mouseenter="handleTriggerEnter"
        @mouseleave="handleTriggerLeave"
      >
        <div :class="[`${prefix}__tip`, `${tooltipPrefix}__tip`, props.tipClass]" :style="tipStyle">
          <div :class="`${tooltipPrefix}__arrow`"></div>
          {{ content }}
        </div>
      </div>
    </transition>
  </Portal>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, toRef, nextTick } from 'vue'
import { Portal } from '@/components/portal'
import { useProps, booleanProp } from '@vexip-ui/config'
import { placementWhileList, usePopper, useSetTimeout } from '@vexip-ui/mixins'

import type { PropType } from 'vue'
import type { Placement } from '@vexip-ui/mixins'
import type { TooltipTheme } from '@/components/tooltip'

export type ClassType = string | Record<string, boolean>

export default defineComponent({
  name: 'Ellipsis',
  components: {
    Portal
  },
  props: {
    placement: String as PropType<Placement>,
    transfer: {
      type: [String, Boolean],
      default: null
    },
    noHover: booleanProp,
    transitionName: String,
    tooltipTheme: String as PropType<TooltipTheme>,
    tipClass: [String, Object] as PropType<ClassType>,
    tipMaxWidth: [Number, String]
  },
  setup(_props) {
    const props = useProps('ellipsis', _props, {
      placement: {
        default: 'top',
        validator: (value: Placement) => placementWhileList.includes(value)
      },
      transfer: 'body',
      noHover: false,
      transitionName: 'vxp-fade',
      tooltipTheme: {
        default: 'dark' as TooltipTheme,
        validator: (value: TooltipTheme) => ['light', 'dark'].includes(value)
      },
      tipClass: null,
      tipMaxWidth: 500
    })

    const prefix = 'vxp-ellipsis'
    const tooltipPrefix = 'vxp-tooltip'
    const visible = ref(false)
    const active = ref(false)
    const placement = toRef(props, 'placement')
    const transfer = toRef(props, 'transfer')
    const content = ref('')

    const wrapper = ref<HTMLElement | null>(null)

    const { popper, transferTo, updatePopper } = usePopper({
      placement,
      transfer,
      wrapper,
      reference: wrapper
    })

    const tipStyle = computed(() => {
      return {
        maxWidth:
          typeof props.tipMaxWidth === 'string'
            ? parseFloat(props.tipMaxWidth) || props.tipMaxWidth
            : `${props.tipMaxWidth}px`
      }
    })

    watch(visible, value => {
      if (value) {
        updatePopper()
      }
    })

    const { timer } = useSetTimeout()

    function handleTriggerEnter() {
      window.clearTimeout(timer.hover)

      timer.hover = window.setTimeout(() => {
        if (!wrapper.value || !wrapper.value.childNodes.length) {
          visible.value = false

          return
        }

        const range = document.createRange()

        range.setStart(wrapper.value, 0)
        range.setEnd(wrapper.value, wrapper.value.childNodes.length)

        const rangeWidth = range.getBoundingClientRect().width
        const computedStyle = getComputedStyle(wrapper.value)
        const horizontalPending =
          parseInt(computedStyle.paddingLeft, 10) + parseInt(computedStyle.paddingRight, 10)

        visible.value = rangeWidth + horizontalPending > wrapper.value.getBoundingClientRect().width
        content.value = visible.value ? wrapper.value.textContent ?? '' : ''

        nextTick(() => {
          active.value = true
        })
      }, 250)
    }

    function handleTriggerLeave() {
      window.clearTimeout(timer.hover)

      timer.hover = window.setTimeout(() => {
        active.value = false
      })
    }

    return {
      props,
      prefix,
      tooltipPrefix,
      visible,
      active,
      content,
      transferTo,

      tipStyle,

      wrapper,
      popper,

      handleTriggerEnter,
      handleTriggerLeave
    }
  }
})
</script>
