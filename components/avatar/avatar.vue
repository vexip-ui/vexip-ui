<script setup lang="ts">
import { Icon } from '@/components/icon'
import { ResizeObserver } from '@/components/resize-observer'

import { computed, inject, ref, watch } from 'vue'

import { createIconProp, emitEvent, useNameHelper, useProps } from '@vexip-ui/config'
import { useDisplay } from '@vexip-ui/hooks'
import { avatarProps } from './props'
import { GROUP_STATE, objectFitValues } from './symbol'

import type { ComponentSize, StyleType } from '@vexip-ui/config'

defineOptions({ name: 'Avatar' })

const _props = defineProps(avatarProps)
const props = useProps('avatar', _props, {
  size: 'default',
  src: {
    default: '',
    static: true
  },
  icon: createIconProp(),
  circle: false,
  alt: '',
  fit: {
    default: 'cover',
    validator: value => objectFitValues.includes(value)
  },
  srcSet: '',
  gap: 4,
  iconScale: 1.4,
  fallbackSrc: '',
  color: null,
  background: null
})

defineSlots<{
  default: () => any,
  icon: () => any
}>()

const groupState = inject(GROUP_STATE, null)

const nh = useNameHelper('avatar')

const loadFail = ref(false)
const fallbackFail = ref(false)

const wrapper = ref<HTMLElement>()
const text = useDisplay(() => scaleText(true))

const size = computed(() => {
  return groupState?.size ?? props.size
})
const className = computed(() => {
  return {
    [nh.b()]: true,
    [nh.bs('vars')]: true,
    [nh.bm('inherit')]: props.inherit,
    [nh.bm(size.value as ComponentSize)]:
      typeof size.value !== 'number' && size.value !== 'default',
    [nh.bm('circle')]: props.circle
  }
})
const style = computed(() => {
  const style: StyleType = {
    [nh.cv('color')]: props.color,
    [nh.cv('bg-color')]: props.background,
    [nh.cv('image-fit')]: props.fit
  }

  if (typeof size.value === 'number') {
    style[nh.cv('size')] = `${size.value}px`
  }

  return style
})

watch(
  () => props.src,
  () => {
    loadFail.value = false
    fallbackFail.value = false
    scaleText()
  }
)
watch(
  () => props.fallbackSrc,
  () => {
    fallbackFail.value = false
    scaleText()
  }
)
watch(
  () => props.gap,
  () => scaleText()
)

defineExpose({ loadFail, fallbackFail })

function handleError(event: Event) {
  loadFail.value = true
  emitEvent(props.onError, event)
}

let lastText: string | null = null

function scaleText(force = false) {
  const avatarEl = wrapper.value
  const textEl = text.value

  if (avatarEl && textEl && (force || lastText === null || lastText !== textEl.textContent)) {
    lastText = textEl.textContent

    const { offsetWidth: avatarWidth, offsetHeight: avatarHeight } = avatarEl
    const { offsetWidth: textWidth, offsetHeight: textHeight } = textEl
    const padding = props.gap * 2

    const ratio = Math.min(
      (avatarWidth - padding) / (textWidth || 1),
      (avatarHeight - padding) / (textHeight || 1),
      1
    )

    textEl.style.transform = `scale(${ratio})`
  }
}

function handleClick(event: MouseEvent) {
  emitEvent(props.onClick, event)
}
</script>

<template>
  <div
    ref="wrapper"
    :class="className"
    :style="style"
    @click="handleClick"
  >
    <img
      v-if="(props.src || props.srcSet) && !loadFail"
      :class="nh.be('image')"
      :src="props.src"
      :alt="props.alt"
      :srcset="props.srcSet"
      @error="handleError"
    />
    <img
      v-else-if="loadFail && props.fallbackSrc && !fallbackFail"
      :class="nh.be('image')"
      :src="props.fallbackSrc"
      :alt="props.alt"
      @error="fallbackFail = true"
    />
    <template v-else-if="icon || $slots.icon">
      <slot name="icon">
        <Icon :class="nh.be('icon')" :icon="icon" :scale="props.iconScale"></Icon>
      </slot>
    </template>
    <ResizeObserver v-else :on-resize="scaleText">
      <span ref="text" :class="nh.be('text')">
        <slot></slot>
      </span>
    </ResizeObserver>
  </div>
</template>
