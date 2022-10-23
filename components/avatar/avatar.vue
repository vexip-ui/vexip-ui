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
    <Icon
      v-else-if="icon"
      :class="nh.be('icon')"
      :icon="icon"
      :scale="props.iconScale"
    ></Icon>
    <ResizeObserver v-else :on-resize="scaleText">
      <span ref="text" :class="nh.be('text')">
        <slot></slot>
      </span>
    </ResizeObserver>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, inject } from 'vue'
import { Icon } from '@/components/icon'
import { ResizeObserver } from '@/components/resize-observer'
import { useNameHelper, useProps, booleanProp, eventProp, emitEvent } from '@vexip-ui/config'
import { GROUP_STATE } from './symbol'

import type { PropType } from 'vue'
import type { ComponentSize } from '@vexip-ui/config'
import type { AvatarObjectFit } from './symbol'

const objectFitValues = Object.freeze<AvatarObjectFit>([
  'fill',
  'contain',
  'cover',
  'none',
  'scale-down'
])

export default defineComponent({
  name: 'Avatar',
  components: {
    Icon,
    ResizeObserver
  },
  props: {
    size: [Number, String] as PropType<number | ComponentSize>,
    src: String,
    icon: Object,
    circle: booleanProp,
    alt: String,
    fit: String as PropType<AvatarObjectFit>,
    srcSet: String,
    gap: Number,
    iconScale: Number,
    fallbackSrc: String,
    color: String,
    background: String,
    onError: eventProp<(event: Event) => void>(),
    onClick: eventProp<(event: MouseEvent) => void>()
  },
  emits: [],
  setup(_props) {
    const props = useProps('avatar', _props, {
      size: 'default' as ComponentSize,
      src: {
        default: '',
        static: true
      },
      icon: null,
      circle: false,
      alt: '',
      fit: {
        default: 'cover' as AvatarObjectFit,
        validator: (value: AvatarObjectFit) => objectFitValues.includes(value)
      },
      srcSet: '',
      gap: 4,
      iconScale: 1.4,
      fallbackSrc: '',
      color: null,
      background: null
    })

    const groupState = inject(GROUP_STATE, null)

    const nh = useNameHelper('avatar')

    const loadFail = ref(false)
    const fallbackFail = ref(false)

    const wrapper = ref<HTMLElement | null>(null)
    const text = ref<HTMLElement | null>(null)

    const size = computed(() => {
      return groupState?.size ?? props.size
    })
    const className = computed(() => {
      return {
        [nh.b()]: true,
        [nh.bs('vars')]: true,
        [nh.bm(size.value)]: typeof size.value !== 'number' && size.value !== 'default',
        [nh.bm('circle')]: props.circle
      }
    })
    const style = computed(() => {
      const style: Record<string, string> = {
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
    watch(() => props.gap, scaleText)

    function handleError(event: Event) {
      loadFail.value = true
      emitEvent(props.onError, event)
    }

    let lastText: string | null = null

    function scaleText() {
      const avatarEl = wrapper.value
      const textEl = text.value

      if (avatarEl && textEl && (lastText === null || lastText !== textEl.textContent)) {
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

    return {
      props,
      nh,
      loadFail,
      fallbackFail,

      wrapper,
      text,

      className,
      style,

      handleError,
      scaleText,
      handleClick
    }
  }
})
</script>
