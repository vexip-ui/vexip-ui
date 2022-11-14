<template>
  <CollapseTransition v-if="!hidden" fade-effect @after-leave="handleAfterLeave">
    <div v-if="!closed" :class="className" role="alert">
      <div :class="nh.be('wrapper')">
        <div v-if="hasTitle" :class="nh.be('title')">
          <slot name="title">
            {{ title }}
          </slot>
        </div>
        <div ref="content" :class="[nh.be('content'), props.scroll && nh.bem('content', 'scroll')]">
          <span
            v-if="props.scroll"
            ref="scrollEl"
            :class="nh.be('scroll')"
            :style="scrollStyle"
            @transitionend="handleScrollEnd"
          >
            <slot></slot>
          </span>
          <slot v-else></slot>
        </div>
      </div>
      <button v-if="props.closable" :class="nh.be('close')" @click="handleClose">
        <slot name="close">
          <Icon label="close">
            <Xmark></Xmark>
          </Icon>
        </slot>
      </button>
      <div v-if="hasIcon" :class="nh.be('icon')">
        <slot name="icon">
          <Icon
            :icon="iconComp"
            :scale="hasTitle ? 2 : 1"
            :style="{ color: props.iconColor }"
          ></Icon>
        </slot>
      </div>
    </div>
  </CollapseTransition>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from 'vue'
import { CollapseTransition } from '@/components/collapse-transition'
import { Icon } from '@/components/icon'
import { useNameHelper, useProps, emitEvent } from '@vexip-ui/config'
import {
  Flag,
  CircleInfo,
  CircleCheck,
  CircleExclamation,
  Xmark,
  CircleXmark
} from '@vexip-ui/icons'
import { getRangeWidth } from '@vexip-ui/utils'
import { alertProps } from './props'
import { useStyle } from './style'

export type AlertType = 'default' | 'info' | 'success' | 'warning' | 'error'

const predefinedIcons = {
  default: Flag,
  info: CircleInfo,
  success: CircleCheck,
  warning: CircleExclamation,
  error: CircleXmark
}

const alertTypes = Object.freeze<AlertType>(['default', 'info', 'success', 'warning', 'error'])

export default defineComponent({
  name: 'Alert',
  components: {
    CollapseTransition,
    Icon,
    Xmark
  },
  props: alertProps,
  emits: [],
  setup(_props, { slots }) {
    const props = useProps('alert', _props, {
      type: {
        default: 'info' as AlertType,
        validator: (value: AlertType) => alertTypes.includes(value)
      },
      title: '',
      colorfulText: false,
      icon: false,
      closable: false,
      iconColor: '',
      noBorder: false,
      banner: false,
      manual: false,
      scroll: false,
      scrollSpeed: 1
    })

    const nh = useNameHelper('alert')

    useStyle(nh)

    const closed = ref(false)
    const hidden = ref(false)
    const scrollDuration = ref(0)
    const scrollOffset = ref(0)
    const scrollWidth = ref(0)

    const content = ref<HTMLElement>()
    const scroll = ref<HTMLElement>()

    const hasTitle = computed(() => {
      return !!(props.title || slots.title)
    })
    const hasIcon = computed(() => {
      return !!(props.icon || slots.icon)
    })
    const className = computed(() => {
      return {
        [nh.b()]: true,
        [nh.bs('vars')]: true,
        [nh.bm(props.type)]: props.type,
        [nh.bm('colorful-text')]: props.colorfulText,
        [nh.bm('has-title')]: hasTitle.value,
        [nh.bm('has-icon')]: hasIcon.value,
        [nh.bm('closable')]: props.closable,
        [nh.bm('no-border')]: !props.banner && props.noBorder,
        [nh.bm('banner')]: props.banner
      }
    })
    const iconComp = computed(() => {
      if (typeof props.icon === 'boolean') {
        return predefinedIcons[props.type] ?? null
      }

      return props.icon
    })
    const scrollStyle = computed(() => {
      return {
        width: `${scrollWidth.value}px`,
        transitionDuration: `${scrollDuration.value}ms`,
        transform: `translateX(${scrollOffset.value}px)`
      }
    })

    watch(
      () => props.scroll,
      value => {
        value && startScroll()
      }
    )

    onMounted(() => {
      props.scroll && startScroll()
    })

    function handleClose() {
      if (!props.manual) {
        closed.value = true
      }

      emitEvent(props.onClose)
    }

    function handleAfterLeave() {
      emitEvent(props.onHide)
      hidden.value = true
    }

    function startScroll() {
      if (content.value && scroll.value) {
        const contentRect = content.value.getBoundingClientRect()
        const rangeWidth = getRangeWidth(scroll.value)
        const duration =
          ((contentRect.width + rangeWidth) * 12) / (Math.max(props.scrollSpeed, 0) || 1)

        scrollDuration.value = 0
        scrollOffset.value = contentRect.width
        scrollWidth.value = rangeWidth

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            scrollDuration.value = duration
            scrollOffset.value = -rangeWidth
          })
        })
      }
    }

    function handleScrollEnd() {
      emitEvent(props.onScrollEnd)
      requestAnimationFrame(startScroll)
    }

    return {
      props,
      nh,

      closed,
      hidden,

      content,
      scrollEl: scroll,

      hasTitle,
      hasIcon,
      className,
      iconComp,
      scrollStyle,

      handleClose,
      handleAfterLeave,
      handleScrollEnd
    }
  }
})
</script>
