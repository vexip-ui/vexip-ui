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
    <transition :name="transitionName" appear @after-leave="visible = false">
      <div
        v-show="active"
        ref="popper"
        :class="{
          [`${tooltipPrefix}__popper`]: true,
          [`${tooltipPrefix}__popper--${tooltipTheme}`]: true,
          [`${tooltipPrefix}__popper--no-hover`]: noHover
        }"
        @click.stop
        @mouseenter="handleTriggerEnter"
        @mouseleave="handleTriggerLeave"
      >
        <div :class="[`${prefix}__tip`, `${tooltipPrefix}__tip`, tipClass]" :style="tipStyle">
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
import { useConfiguredProps } from '@/common/config/install'
import { placementWhileList, usePopper } from '@/common/mixins/popper'

import type { PropType } from 'vue'
import type { Placement } from '@popperjs/core'
import type { TooltipTheme } from '@/components/tooltip'

export type ClassType = string | Record<string, boolean>

const props = useConfiguredProps('ellipsis', {
  placement: {
    type: String as PropType<Placement>,
    default: 'top',
    validator: (value: Placement) => {
      return placementWhileList.includes(value)
    }
  },
  transfer: {
    type: String,
    default: 'body'
  },
  noHover: {
    type: Boolean,
    default: false
  },
  transitionName: {
    type: String,
    default: 'vxp-fade'
  },
  tooltipTheme: {
    default: 'dark' as TooltipTheme,
    validator: (value: TooltipTheme) => {
      return ['light', 'dark'].includes(value)
    }
  },
  tipClass: {
    type: [String, Object] as PropType<ClassType>,
    default: null
  },
  tipMaxWidth: {
    type: [Number, String],
    default: 500
  }
})

export default defineComponent({
  name: 'Ellipsis',
  components: {
    Portal
  },
  props,
  setup(props) {
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

    let hoverTimer: number

    function handleTriggerEnter() {
      window.clearTimeout(hoverTimer)

      hoverTimer = window.setTimeout(() => {
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
      window.clearTimeout(hoverTimer)

      hoverTimer = window.setTimeout(() => {
        active.value = false
      })
    }

    return {
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
