<template>
  <div
    v-show="!hidden"
    ref="wrapper"
    :class="className"
    role="none"
    :style="style"
  >
    <slot v-if="loading" name="placeholder">
      <Skeleton
        v-if="props.skeleton"
        :class="nh.be('skeleton')"
        image
        v-bind="skeletonProps"
      ></Skeleton>
      <template v-else>
        <span :class="nh.be('placeholder')">
          {{ props.placeholder || locale.placeholder }}
        </span>
      </template>
    </slot>
    <slot v-else-if="showError" name="error">
      <span :class="nh.be('error')">
        {{ props.errorTip || props.alt || locale.error }}
      </span>
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
      :aria-label="props.alt"
      @load="handleLoad"
      @error="handleError"
      @click="handlePreview"
    />
    <ImageViewer
      v-if="hasPreview"
      v-model:active="viewerActive"
      :srcs="props.previewSrc || loadSrc"
      :transfer="props.viewerTransfer"
    >
      <template #default="{ src }">
        <slot v-if="$slots.preview" name="preview" :src="src"></slot>
      </template>
    </ImageViewer>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  computed,
  watch,
  watchEffect,
  inject,
  onBeforeUnmount
} from 'vue'
import { ImageViewer } from '@/components/image-viewer'
import { Skeleton } from '@/components/skeleton'
import { useNameHelper, useProps, useLocale, emitEvent } from '@vexip-ui/config'
import { useIntersection } from '@vexip-ui/hooks'
import { isClient, supportImgLoading } from '@vexip-ui/utils'
import { imageProps } from './props'
import { GROUP_STATE } from './symbol'

import type { ImageState } from './symbol'

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
    ImageViewer,
    Skeleton
  },
  props: imageProps,
  emits: [],
  setup(_props) {
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
      placeholder: '',
      errorTip: '',
      radius: 0,
      border: false,
      previewSrc: '',
      viewerTransfer: false
    })

    const groupState = inject(GROUP_STATE, null)

    const nh = useNameHelper('image')
    const locale = useLocale('image')

    const shouldLoad = ref(useImageLoading)
    const loading = ref(shouldLoad.value)
    const loadSrc = ref('')
    const loadFail = ref(false)
    const fallbackFail = ref(false)
    const viewerActive = ref(false)
    const hidden = ref(false)

    const wrapper = ref<HTMLElement>()

    const showError = computed(() => {
      return loadFail.value && (!props.fallbackSrc || fallbackFail.value)
    })
    const hasPreview = computed(() => !groupState && props.preview)
    const className = computed(() => {
      return [
        nh.b(),
        nh.bs('vars'),
        {
          [nh.bm('inherit')]: props.inherit,
          [nh.bm('border')]: props.border,
          [nh.bm('loading')]: loading.value,
          [nh.bm('error')]: showError.value,
          [nh.bm('preview')]: groupState?.preview || hasPreview.value
        }
      ]
    })
    const style = computed(() => {
      const style: Record<string, string> = {
        width: normalizeSize(props.width),
        height: normalizeSize(props.height),
        [nh.cv('fit')]: props.fit,
        [nh.cv('radius')]: props.radius ? `${props.radius}px` : ''
      }

      if (props.border && typeof props.border === 'string') {
        style[nh.cv('b-color')] = props.border
      }

      return style
    })
    const imageSrc = computed(() => props.src || (props.imgAttrs?.src as string))
    const imageLoading = computed(() => {
      return hidden.value || (useImageLoading && props.lazy) ? 'lazy' : undefined
    })
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

    const state: ImageState = reactive({
      src: computed(() => props.previewSrc || loadSrc.value),
      index: 0,
      total: 0
    })

    if (groupState) {
      groupState.increaseItem(state)

      const stopWatch = watchEffect(() => {
        hidden.value = !groupState.showAll && state.index > 0
      })

      onBeforeUnmount(() => {
        stopWatch()
        groupState.decreaseItem(state)
      })
    }

    if (!useImageLoading) {
      let disconnect: (() => void) | undefined

      const stopWatch = watchEffect(() => {
        disconnect?.()
        disconnect = undefined

        if (!isClient) return

        const root =
          typeof props.root === 'string'
            ? document.querySelector(props.root)
            : (props.root as Element)

        if (props.lazy) {
          disconnect = useIntersection({
            root: typeof root === 'object' ? root : document.documentElement,
            rootMargin: props.rootMargin,
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
      } else {
        loading.value = false
      }

      loadFail.value = true
      emitEvent(props.onError, event)
    }

    function handlePreview() {
      if (!groupState) {
        if (props.preview) {
          viewerActive.value = true
        }

        emitEvent(props.onPreview, props.previewSrc || loadSrc.value)
        return
      }

      groupState.handlePreview(state)
    }

    return {
      props,
      nh,
      locale,

      shouldLoad,
      loading,
      loadSrc,
      loadFail,
      fallbackFail,
      viewerActive,
      hidden,

      showError,
      hasPreview,
      className,
      style,
      imageLoading,
      skeletonProps,

      wrapper,

      handleLoad,
      handleError,
      handlePreview
    }
  }
})
</script>
