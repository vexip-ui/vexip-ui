<template>
  <div ref="wrapper" :class="className" :style="style">
    <img
      v-if="(props.src || props.srcSet) && !loadFail"
      :class="`${prefix}__image`"
      :src="props.src"
      :alt="props.alt"
      :srcset="props.srcSet"
      @error="handleError"
    />
    <img
      v-else-if="loadFail && props.fallbackSrc && !fallbackFail"
      :class="`${prefix}__image`"
      :src="props.fallbackSrc"
      :alt="props.alt"
      @error="fallbackFail = true"
    />
    <Icon
      v-else-if="icon"
      :class="`${prefix}__icon`"
      :icon="icon"
      :scale="props.iconScale"
    ></Icon>
    <ResizeObserver v-else :on-resize="scaleText">
      <span ref="text" :class="`${prefix}__text`">
        <slot></slot>
      </span>
    </ResizeObserver>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import { Icon } from '@/components/icon'
import { ResizeObserver } from '@/components/resize-observer'
import { useProps, booleanProp } from '@vexip-ui/config'

import type { PropType } from 'vue'
import type { ComponentSize } from '@vexip-ui/config'

type ObjectFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'

const objectFitValues = Object.freeze<ObjectFit>(['fill', 'contain', 'cover', 'none', 'scale-down'])

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
    fit: String as PropType<ObjectFit>,
    srcSet: String,
    gap: Number,
    iconScale: Number,
    fallbackSrc: String
  },
  emits: ['error'],
  setup(_props, { emit }) {
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
        default: 'cover' as ObjectFit,
        validator: (value: ObjectFit) => objectFitValues.includes(value)
      },
      srcSet: '',
      gap: 4,
      iconScale: 1.4,
      fallbackSrc: ''
    })

    const prefix = 'vxp-avatar'
    const loadFail = ref(false)
    const fallbackFail = ref(false)

    const wrapper = ref<HTMLElement | null>(null)
    const text = ref<HTMLElement | null>(null)

    const className = computed(() => {
      return {
        [prefix]: true,
        [`${prefix}-vars`]: true,
        [`${prefix}--${props.size}`]: typeof props.size !== 'number' && props.size !== 'default',
        [`${prefix}--circle`]: props.circle
      }
    })
    const style = computed(() => {
      const style: Record<string, any> = {
        '--vxp-avatar-image-fit': props.fit
      }

      if (typeof props.size === 'number') {
        style['--vxp-avatar-size'] = `${props.size}px`
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
      scaleText
    )

    function handleError(event: Event) {
      loadFail.value = true
      emit('error', event)
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

    return {
      props,
      prefix,
      loadFail,
      fallbackFail,

      wrapper,
      text,

      className,
      style,

      handleError,
      scaleText
    }
  }
})
</script>
