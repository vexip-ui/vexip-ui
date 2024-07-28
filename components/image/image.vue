<script setup lang="ts">
import { ImageViewer } from '@/components/image-viewer'
import { Skeleton } from '@/components/skeleton'

import { computed, inject, onBeforeUnmount, reactive, ref, watch, watchEffect } from 'vue'

import { emitEvent, useLocale, useNameHelper, useProps } from '@vexip-ui/config'
import { useIntersection } from '@vexip-ui/hooks'
import { isClient, supportImgLoading, toCssSize } from '@vexip-ui/utils'
import { imageProps } from './props'
import { GROUP_STATE, objectFitValues } from './symbol'

import type { ImageState } from './symbol'

const useImgLoading = supportImgLoading()

defineOptions({ name: 'Image' })

const _props = defineProps(imageProps)
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
  viewerTransfer: null,
  viewerProps: () => ({})
})

const groupState = inject(GROUP_STATE, null)

const nh = useNameHelper('image')
const locale = useLocale('image')

const showImg = ref(useImgLoading)
const loading = ref(showImg.value)
const currentSrc = ref('')
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
    width: toCssSize(props.width),
    height: toCssSize(props.height),
    [nh.cv('fit')]: props.fit,
    [nh.cv('radius')]: props.radius ? `${props.radius}px` : ''
  }

  if (props.border && typeof props.border === 'string') {
    style[nh.cv('b-color')] = props.border
  }

  return style
})
const imageSrc = computed(() => props.src || (props.imgAttrs?.src as string))
const imgLoading = computed(() => {
  return hidden.value || (useImgLoading && props.lazy) ? 'lazy' : undefined
})
const skeletonProps = computed(() => {
  return typeof props.skeleton === 'object'
    ? Object.assign({ activated: true }, props.skeleton)
    : { activated: true }
})

watch(imageSrc, value => {
  loading.value = showImg.value
  currentSrc.value = value
  loadFail.value = false
  fallbackFail.value = false
})
watch(
  () => props.fallbackSrc,
  value => {
    fallbackFail.value = false

    if (loadFail.value) {
      loading.value = showImg.value
      currentSrc.value = value
    }
  }
)

currentSrc.value = imageSrc.value

const state: ImageState = reactive({
  src: computed(() => props.previewSrc || currentSrc.value),
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

if (!useImgLoading) {
  let disconnect: (() => void) | undefined

  const stopWatch = watchEffect(() => {
    disconnect?.()
    disconnect = undefined

    if (!isClient) return

    const root =
      typeof props.root === 'string' ? document.querySelector(props.root) : (props.root as Element)

    if (props.lazy) {
      disconnect = useIntersection({
        root: typeof root === 'object' ? root : document.documentElement,
        rootMargin: props.rootMargin,
        target: wrapper,
        handler: () => {
          disconnect?.()
          disconnect = undefined
          showImg.value = true
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

defineExpose({
  loading,
  fallbackFail,
  viewerActive,
  hidden,
  wrapper
})

function handleLoad(event: Event) {
  loading.value = false

  if (!props.fallbackSrc || currentSrc.value !== props.fallbackSrc) {
    emitEvent(props.onLoad, event)
  }
}

function handleError(event: Event) {
  if (props.fallbackSrc) {
    if (currentSrc.value === props.fallbackSrc) {
      loading.value = false
      fallbackFail.value = true

      return
    }

    currentSrc.value = props.fallbackSrc
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

    emitEvent(props.onPreview, props.previewSrc || currentSrc.value)
    return
  }

  groupState.handlePreview(state)
}
</script>

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
        v-bind="skeletonProps"
        :class="nh.be('skeleton')"
        image
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
      v-if="showImg && !showError"
      v-bind="props.imgAttrs"
      :class="nh.be('img')"
      :src="currentSrc"
      :alt="props.alt"
      :width="props.width || undefined"
      :height="props.height || undefined"
      :loading="imgLoading"
      :aria-label="props.alt"
      @load="handleLoad"
      @error="handleError"
      @click="handlePreview"
    />
    <ImageViewer
      v-if="hasPreview"
      v-bind="viewerProps"
      v-model:active="viewerActive"
      :src-list="props.previewSrc || currentSrc"
      :transfer="props.viewerTransfer"
    >
      <template #default="{ src }">
        <slot v-if="$slots.preview" name="preview" :src="src"></slot>
      </template>
    </ImageViewer>
  </div>
</template>
