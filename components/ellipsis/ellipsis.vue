<template>
  <Tooltip
    :visible="visible"
    trigger="custom"
    :disabled="props.tipDisabled"
    :transfer="props.transfer"
    :placement="props.placement"
    :no-hover="props.noHover"
    :transition-name="props.transitionName"
    :tip-class="props.tipClass"
    :tip-style="tipStyle"
    :reverse="props.tooltipTheme === 'dark'"
    @tip-enter="handleTriggerEnter"
    @tip-leave="handleTriggerLeave"
  >
    <template #trigger>
      <div
        ref="wrapper"
        :class="className"
        :style="ellipsisStyle"
        v-bind="$attrs"
      >
        <slot></slot>
      </div>
    </template>
    {{ content }}
  </Tooltip>
</template>

<script lang="ts">
import { Tooltip } from '@/components/tooltip'

import { computed, defineComponent, ref } from 'vue'

import { useNameHelper, useProps } from '@vexip-ui/config'
import { placementWhileList, useSetTimeout } from '@vexip-ui/hooks'
import { getRangeWidth } from '@vexip-ui/utils'
import { ellipsisProps } from './props'

export default defineComponent({
  name: 'Ellipsis',
  components: {
    Tooltip
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

    const visible = ref(false)
    const content = ref('')

    const wrapper = ref<HTMLElement>()

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
      }, 250)
    }

    function handleTriggerLeave() {
      clearTimeout(timer.hover)

      if (props.tipDisabled) return

      timer.hover = setTimeout(() => {
        visible.value = false
      }, 250)
    }

    return {
      props,
      nh,
      visible,
      content,

      className,
      ellipsisStyle,
      tipStyle,

      wrapper,

      handleTriggerEnter,
      handleTriggerLeave
    }
  }
})
</script>
