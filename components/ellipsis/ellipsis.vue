<template>
  <div
    ref="wrapper"
    :class="className"
    :style="ellipsisStyle"
    v-bind="$attrs"
    @mouseenter="handleTriggerEnter"
    @mouseleave="handleTriggerLeave"
  >
    <slot></slot>
  </div>
  <Portal v-if="!props.tipDisabled && visible" :to="transferTo">
    <transition :name="props.transitionName" appear @after-leave="visible = false">
      <div
        v-show="active"
        ref="popper"
        :class="{
          [tooltipNh.be('popper')]: true,
          [tooltipNh.bs('vars')]: true,
          [tooltipNh.bem('popper', 'inherit')]: transferTo !== 'body',
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
import { useNameHelper, useProps } from '@vexip-ui/config'
import { placementWhileList, usePopper, useSetTimeout } from '@vexip-ui/hooks'
import { getRangeWidth } from '@vexip-ui/utils'
import { ellipsisProps } from './props'

export default defineComponent({
  name: 'Ellipsis',
  components: {
    Portal
  },
  props: ellipsisProps,
  setup(_props) {
    const nh = useNameHelper('ellipsis')
    const props = useProps('ellipsis', _props, {
      placement: {
        default: 'top',
        validator: value => placementWhileList.includes(value)
      },
      transfer: 'body',
      noHover: false,
      transitionName: () => nh.ns('fade'),
      tooltipTheme: {
        default: 'dark',
        validator: value => ['light', 'dark'].includes(value)
      },
      tipClass: null,
      maxLines: null,
      tipMaxWidth: 500,
      tipDisabled: false
    })

    const tooltipNh = useNameHelper('tooltip')
    const visible = ref(false)
    const active = ref(false)
    const placement = toRef(props, 'placement')
    const transfer = toRef(props, 'transfer')
    const content = ref('')

    const wrapper = ref<HTMLElement>()

    const { popper, transferTo, updatePopper } = usePopper({
      placement,
      transfer,
      wrapper,
      reference: wrapper
    })

    const className = computed(() => {
      return {
        [nh.b()]: true,
        [nh.bm('inherit')]: props.inherit,
        [nh.bm('multiple')]: props.maxLines
      }
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
    watch(
      () => props.tipDisabled,
      value => {
        if (value) {
          visible.value = false
          active.value = false
        }
      }
    )

    const { timer } = useSetTimeout()

    function handleTriggerEnter() {
      clearTimeout(timer.hover)

      if (props.tipDisabled) return

      timer.hover = setTimeout(() => {
        if (!wrapper.value || !wrapper.value.childNodes.length) {
          visible.value = false
          return
        }

        // In the case of multiple lines, use visual height and
        // real content height to control whether to display
        if (props.maxLines > 0) {
          const scrollHeight = wrapper.value.scrollHeight
          const clientHeight = wrapper.value.clientHeight

          visible.value = scrollHeight > clientHeight
        } else {
          visible.value = getRangeWidth(wrapper.value) > wrapper.value.getBoundingClientRect().width
        }

        content.value = visible.value ? wrapper.value.textContent ?? '' : ''

        nextTick(() => {
          active.value = true
        })
      }, 250)
    }

    function handleTriggerLeave() {
      clearTimeout(timer.hover)

      if (props.tipDisabled) return

      timer.hover = setTimeout(() => {
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

      className,
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
