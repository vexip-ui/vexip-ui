<script setup lang="ts">
import { ImageViewer } from '@/components/image-viewer'
import { Renderer } from '@/components/renderer'

import { computed, provide, reactive, ref, toRef } from 'vue'

import { emitEvent, useNameHelper, useProps } from '@vexip-ui/config'
import { debounceMinor } from '@vexip-ui/utils'
import { imageGroupProps } from './props'
import { GROUP_STATE } from './symbol'

import type { ImageGroupSlots, ImageState } from './symbol'

defineOptions({ name: 'ImageGroup' })

const _props = defineProps(imageGroupProps)
const props = useProps('imageGroup', _props, {
  showAll: false,
  preview: false,
  viewerTransfer: null,
  slots: () => ({})
})

const slots = defineSlots<ImageGroupSlots>()

const nh = useNameHelper('image-group')

const currentActive = ref(false)
const currentIndex = ref(0)
const imageStates = reactive(new Set<ImageState>())

const className = computed(() => {
  return [
    nh.b(),
    nh.ns('image-vars'),
    {
      [nh.bm('preview')]: props.preview
    }
  ]
})
const srcList = computed(() => Array.from(imageStates).map(state => state.src))

const refreshIndex = debounceMinor(() => {
  const total = imageStates.size

  Array.from(imageStates).forEach((item, index) => {
    item.index = index
    item.total = total
  })
})

provide(
  GROUP_STATE,
  reactive({
    showAll: toRef(props, 'showAll'),
    preview: toRef(props, 'preview'),
    increaseItem,
    decreaseItem,
    handlePreview
  })
)

defineExpose({ currentActive, currentIndex })

function increaseItem(item: ImageState) {
  imageStates.add(item)
  refreshIndex()
}

function decreaseItem(item: ImageState) {
  imageStates.delete(item)
  refreshIndex()
}

function handlePreview(item: ImageState) {
  currentIndex.value = item.index
  currentActive.value = true

  emitEvent(props.onPreview, item.src, Array.from(srcList.value))
}
</script>

<template>
  <div :class="className">
    <slot></slot>
    <ImageViewer
      v-if="props.preview"
      v-model:active="currentActive"
      v-model:index="currentIndex"
      :src-list="srcList"
      :transfer="props.viewerTransfer"
    >
      <template v-if="slots.preview || props.slots.preview" #default="{ src }">
        <slot name="preview" :src="src">
          <Renderer :renderer="props.slots.preview" :data="{ src }"></Renderer>
        </slot>
      </template>
    </ImageViewer>
  </div>
</template>
