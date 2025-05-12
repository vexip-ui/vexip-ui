<script setup lang="ts">
import { CollapseTransition } from '@/components/collapse-transition'
import { Icon } from '@/components/icon'
import { Renderer } from '@/components/renderer'

import { computed, onMounted, ref, watch } from 'vue'

import { emitEvent, useIcons, useNameHelper, useProps } from '@vexip-ui/config'
import { adjustAlpha, getRangeWidth, isClient, mixColor, parseColorToRgba } from '@vexip-ui/utils'
import { alertProps } from './props'
import { alertTypes } from './symbol'

import type { AlertSlots } from './symbol'

defineOptions({ name: 'Alert' })

const _props = defineProps(alertProps)
const props = useProps('alert', _props, {
  type: {
    default: 'primary',
    validator: value => alertTypes.includes(value),
  },
  title: '',
  colorfulText: false,
  icon: {
    isFunc: true,
    default: false,
  },
  closable: false,
  iconColor: '',
  noBorder: false,
  banner: false,
  manual: false,
  scroll: false,
  scrollSpeed: 1,
  color: null,
  slots: () => ({}),
})

const slots = defineSlots<AlertSlots>()

const nh = useNameHelper('alert')
const icons = useIcons()

const predefinedIcons = computed(() => ({
  default: icons.value.alert,
  primary: icons.value.info,
  info: icons.value.info,
  success: icons.value.success,
  warning: icons.value.warning,
  error: icons.value.error,
}))

const closed = ref(false)
const hidden = ref(false)
const scrollDuration = ref(0)
const scrollOffset = ref(0)
const scrollWidth = ref(0)

const content = ref<HTMLElement>()
const scrollEl = ref<HTMLElement>()

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
    [nh.bm('inherit')]: props.inherit,
    [nh.bm(props.type)]: props.type,
    [nh.bm('colorful-text')]: props.colorfulText,
    [nh.bm('has-title')]: hasTitle.value,
    [nh.bm('has-icon')]: hasIcon.value,
    [nh.bm('closable')]: props.closable,
    [nh.bm('no-border')]: !props.banner && props.noBorder,
    [nh.bm('banner')]: props.banner,
  }
})
const style = computed(() => {
  if (!props.color) return undefined

  const rootStyle = isClient ? getComputedStyle(document.documentElement) : null
  const black = parseColorToRgba(rootStyle?.getPropertyValue(nh.nv('color-black')) || '#000')
  const baseColor = parseColorToRgba(props.color)

  return nh.cvm({
    'bg-color': adjustAlpha(baseColor, 0.2).toString(),
    'b-color': adjustAlpha(baseColor, 0.5).toString(),
    'icon-color': mixColor(black, baseColor, 0.2).toString(),
    ...(props.colorfulText
      ? {
          'text-color': mixColor(black, baseColor, 0.2).toString(),
          'title-color': mixColor(black, baseColor, 0.2).toString(),
        }
      : {}),
  })
})
const iconComp = computed(() => {
  if (typeof props.icon === 'boolean') {
    return predefinedIcons.value[props.type] ?? {}
  }

  return { icon: props.icon }
})
const scrollStyle = computed(() => {
  return {
    width: `${scrollWidth.value}px`,
    transitionDuration: `${scrollDuration.value}ms`,
    transform: `translateX(${scrollOffset.value}px)`,
  }
})

watch(
  () => props.scroll,
  value => {
    value && startScroll()
  },
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
  if (content.value && scrollEl.value) {
    const contentRect = content.value.getBoundingClientRect()
    const rangeWidth = getRangeWidth(scrollEl.value)
    const duration = ((contentRect.width + rangeWidth) * 12) / (Math.max(props.scrollSpeed, 0) || 1)

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
</script>

<template>
  <CollapseTransition v-if="!hidden" fade-effect @after-leave="handleAfterLeave">
    <div
      v-if="!closed"
      :class="className"
      role="alert"
      :style="style"
    >
      <div :class="nh.be('wrapper')">
        <div v-if="hasTitle" :class="nh.be('title')">
          <slot name="title">
            <Renderer :renderer="props.slots.title">
              {{ title }}
            </Renderer>
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
            <slot>
              <Renderer :renderer="props.slots.default"></Renderer>
            </slot>
          </span>
          <slot v-else>
            <Renderer :renderer="props.slots.default"></Renderer>
          </slot>
        </div>
      </div>
      <button
        v-if="props.closable"
        type="button"
        :class="nh.be('close')"
        @click="handleClose"
      >
        <slot name="close">
          <Renderer :renderer="props.slots.close">
            <Icon v-bind="icons.close" label="close"></Icon>
          </Renderer>
        </slot>
      </button>
      <div v-if="hasIcon" :class="nh.be('icon')">
        <slot name="icon">
          <Renderer :renderer="props.slots.icon">
            <Icon
              v-bind="iconComp"
              :scale="hasTitle ? 2 : 1"
              :style="{ color: props.iconColor }"
            ></Icon>
          </Renderer>
        </slot>
      </div>
    </div>
  </CollapseTransition>
</template>
