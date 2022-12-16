<template>
  <div
    ref="wrapper"
    :class="className"
    role="none"
    :style="style"
  >
    <slot v-if="hasPlaceholder && loading" name="placeholder">
      <Skeleton
        v-if="props.skeleton"
        :class="nh.be('skeleton')"
        image
        v-bind="skeletonProps"
      ></Skeleton>
    </slot>
    <slot v-if="showError" name="error">
      {{ props.errorTip || props.alt || props.src }}
    </slot>
    <img
      v-if="shouldLoad && !showError"
      :class="nh.be('img')"
      v-bind="props.imgAttrs"
      :src="loadSrc"
      :alt="props.alt"
      :width="props.width || undefined"
      :height="props.height || undefined"
      :loading="imageLoading"
      @load="handleLoad"
      @error="handleError"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, watchEffect, onBeforeUnmount } from 'vue'
import { Skeleton } from '@/components/skeleton'
import { useNameHelper, useProps, emitEvent } from '@vexip-ui/config'
import { useIntersection } from '@vexip-ui/hooks'
import { supportImgLoading } from '@vexip-ui/utils'
import { imageProps } from './props'

const useImageLoading = supportImgLoading()
const objectFitValues = Object.freeze(['fill', 'contain', 'cover', 'none', 'scale-down'])

const numberRE = /[\d.]$/

function normalizeSize(value: string | number) {
  if (typeof value === 'number') return value ? `${value}px` : '0'

  value = value.trim()

  return value && (numberRE.test(value) ? `${value}px` : value)
}

export default defineComponent({
  name: 'Image',
  components: {
    Skeleton
  },
  props: imageProps,
  emits: [],
  setup(_props, { slots }) {
    const props = useProps('image', _props, {
      src: {
        default: '',
        static: true
      },
      fallbackSrc: '',
      alt: '',
      fit: {
        default: 'cover',
        validator: value => objectFitValues.includes(value)
      },
      width: '',
      height: '',
      imgAttrs: () => ({}),
      lazy: false,
      root: {
        default: null,
        static: true
      },
      rootMargin: '',
      preview: false,
      skeleton: false,
      errorTip: '',
      radius: 0,
      border: false
    })

    const nh = useNameHelper('image')

    const shouldLoad = ref(useImageLoading)
    const loading = ref(shouldLoad.value)
    const loadSrc = ref('')
    const loadFail = ref(false)
    const fallbackFail = ref(false)

    const wrapper = ref<HTMLElement>()

    const showError = computed(() => {
      // props.fallbackSrc ? loadFail.value && fallbackFail.value : loadFail.value
      return loadFail.value && (!props.fallbackSrc || fallbackFail.value)
    })
    const className = computed(() => {
      return [
        nh.b(),
        nh.bs('vars'),
        {
          [nh.bm('inherit')]: props.inherit,
          [nh.bm('border')]: props.border,
          [nh.bm('loading')]: loading.value,
          [nh.bm('error')]: showError.value
        }
      ]
    })
    const style = computed(() => {
      const style: Record<string, string> = {
        width: normalizeSize(props.width),
        height: normalizeSize(props.height),
        [nh.cv('fit')]: props.fit,
        [nh.cv('radius')]: props.radius && `${props.radius}px`
      }

      if (props.border && typeof props.border === 'string') {
        style[nh.cv('b-color')] = props.border
      }

      return style
    })
    const imageSrc = computed(() => props.src || (props.imgAttrs?.src as string))
    const imageLoading = computed(() => {
      return useImageLoading && props.lazy ? 'lazy' : undefined
    })
    const hasPlaceholder = computed(() => !!(slots.placeholder || props.skeleton))
    const skeletonProps = computed(() => {
      return typeof props.skeleton === 'object'
        ? Object.assign({ activated: true }, props.skeleton)
        : { activated: true }
    })

    watch(imageSrc, value => {
      loading.value = shouldLoad.value
      loadSrc.value = value
      loadFail.value = false
      fallbackFail.value = false
    })
    watch(
      () => props.fallbackSrc,
      value => {
        fallbackFail.value = false

        if (loadFail.value) {
          loading.value = shouldLoad.value
          loadSrc.value = value
        }
      }
    )

    loadSrc.value = imageSrc.value

    if (!useImageLoading) {
      let disconnect: (() => void) | undefined

      const stopWatch = watchEffect(() => {
        disconnect?.()
        disconnect = undefined

        if (props.lazy) {
          disconnect = useIntersection({
            target: wrapper,
            handler: () => {
              disconnect?.()
              disconnect = undefined
              shouldLoad.value = true
              loading.value = true
            }
          }).disconnect
        }
      })

      onBeforeUnmount(() => {
        stopWatch()
        disconnect?.()
      })
    }

    function handleLoad(event: Event) {
      loading.value = false

      if (!props.fallbackSrc || loadSrc.value !== props.fallbackSrc) {
        emitEvent(props.onLoad, event)
      }
    }

    function handleError(event: Event) {
      if (props.fallbackSrc) {
        if (loadSrc.value === props.fallbackSrc) {
          loading.value = false
          fallbackFail.value = true

          return
        }

        loadSrc.value = props.fallbackSrc
      }

      loadFail.value = true
      emitEvent(props.onError, event)
    }

    return {
      props,
      nh,
      shouldLoad,
      loading,
      loadSrc,
      loadFail,
      fallbackFail,

      showError,
      className,
      style,
      imageLoading,
      hasPlaceholder,
      skeletonProps,

      wrapper,

      handleLoad,
      handleError
    }
  }
})
</script>
