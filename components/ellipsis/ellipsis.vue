<template>
  <div
    ref="wrapper"
    :class="props.maxLines > 0 ? nh.bm('multiple') : nh.b()"
    :style="ellipsisStyle"
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
          [tooltipNh.be('popper')]: true,
          [tooltipNh.bs('vars')]: true,
          [tooltipNh.bem('popper', props.tooltipTheme)]: true,
          [tooltipNh.bem('popper', 'no-hover')]: props.noHover
        }"
        @click.stop
        @mouseenter="handleTriggerEnter"
        @mouseleave="handleTriggerLeave"
      >
        <div :class="[nh.be('tip'), tooltipNh.be('tip'), props.tipClass]" :style="tipStyle">
          <div :class="tooltipNh.be('arrow')"></div>
          {{ content }}
        </div>
      </div>
    </transition>
  </Portal>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, toRef, nextTick } from 'vue'
import { Portal } from '@/components/portal'
import { useNameHelper, useProps, booleanProp, classProp } from '@vexip-ui/config'
import { placementWhileList, usePopper, useSetTimeout } from '@vexip-ui/mixins'

import type { PropType } from 'vue'
import type { Placement } from '@vexip-ui/mixins'
import type { TooltipTheme } from '@/components/tooltip'

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
    tipClass: classProp,
    maxLines: Number,
    tipMaxWidth: [Number, String]
  },
  setup(_props) {
    const nh = useNameHelper('ellipsis')
    const props = useProps('ellipsis', _props, {
      placement: {
        default: 'top',
        validator: (value: Placement) => placementWhileList.includes(value)
      },
      transfer: 'body',
      noHover: false,
      transitionName: () => nh.ns('fade'),
      tooltipTheme: {
        default: 'dark' as TooltipTheme,
        validator: (value: TooltipTheme) => ['light', 'dark'].includes(value)
      },
      tipClass: null,
      maxLines: null,
      tipMaxWidth: 500
    })

    const tooltipNh = useNameHelper('tooltip')
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
    const ellipsisStyle = computed(() => {
      return props.maxLines > 0 ? { '-webkit-line-clamp': props.maxLines } : ''
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
        // In the case of multiple lines, use visual height and real content height to control whether to display
        if (props.maxLines > 0) {
          const scrollHeight = wrapper.value.scrollHeight
          const clientHeight = wrapper.value.clientHeight
          visible.value = scrollHeight > clientHeight
        } else {
          const range = document.createRange()

          range.setStart(wrapper.value, 0)
          range.setEnd(wrapper.value, wrapper.value.childNodes.length)

          const rangeWidth = range.getBoundingClientRect().width
          const computedStyle = getComputedStyle(wrapper.value)
          const horizontalPending =
          parseInt(computedStyle.paddingLeft, 10) + parseInt(computedStyle.paddingRight, 10)

          visible.value = rangeWidth + horizontalPending > wrapper.value.getBoundingClientRect().width
        }

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
      nh,
      tooltipNh,
      visible,
      active,
      content,
      transferTo,

      ellipsisStyle,
      tipStyle,

      wrapper,
      popper,

      handleTriggerEnter,
      handleTriggerLeave
    }
  }
})
</script>
