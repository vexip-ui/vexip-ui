<script setup lang="ts">
import { Icon } from '@/components/icon'
import { Masker } from '@/components/masker'
import { Renderer } from '@/components/renderer'
import { Viewer } from '@/components/viewer'

import { computed, ref, watch } from 'vue'

import { emitEvent, useIcons, useNameHelper, useProps } from '@vexip-ui/config'
import { boundRange, ensureArray, isDefined } from '@vexip-ui/utils'
import { imageViewerProps } from './props'

import type { ImageViewerSlots } from './symbol'

defineOptions({ name: 'ImageViewer' })

const _props = defineProps(imageViewerProps)
const props = useProps('imageViewer', _props, {
  active: false,
  index: 0,
  srcList: {
    default: '',
    static: true,
  },
  transfer: false,
  viewerProps: () => ({}),
  slots: () => ({}),
})

const emit = defineEmits(['update:active', 'update:index'])

defineSlots<ImageViewerSlots>()

const nh = useNameHelper('image-viewer')
const icons = useIcons()

const currentActive = ref(props.active)
const currentIndex = ref(props.index)

const viewer = ref<InstanceType<typeof Viewer>>()

const className = computed(() => {
  return [nh.b(), nh.ns('image-vars'), props.inherit && nh.bm('inherit')]
})
const srcArray = computed(() => ensureArray(isDefined(props.srcList) ? props.srcList : ''))
const prevDisabled = computed(() => currentIndex.value <= 0)
const nextDisabled = computed(() => currentIndex.value >= srcArray.value.length - 1)

watch(
  () => props.active,
  value => {
    currentActive.value = value
  },
)
watch(
  () => props.index,
  value => {
    currentIndex.value = value
  },
)
watch(() => srcArray.value.length, verifyIndex)

defineExpose({
  currentActive,
  currentIndex,
  prevDisabled,
  nextDisabled,
  viewer,
})

function setActive(active: boolean) {
  if (currentActive.value === active) return

  currentActive.value = active

  emit('update:active', active)
  emitEvent(props.onToggle, active)
}

function verifyIndex() {
  currentIndex.value = boundRange(currentIndex.value, 0, srcArray.value.length - 1)
}

function handleChange() {
  const value = currentIndex.value

  viewer.value?.handleReset()
  emit('update:index', value)
  emitEvent(props.onChange, value, srcArray.value[value])
}

function handlePrev() {
  if (prevDisabled.value) return

  const prev = currentIndex.value

  currentIndex.value--
  verifyIndex()
  currentIndex.value !== prev && handleChange()
  emitEvent(props.onPrev, currentIndex.value, srcArray.value[currentIndex.value])
}

function handleNext() {
  if (nextDisabled.value) return

  const prev = currentIndex.value

  currentIndex.value++
  verifyIndex()
  currentIndex.value !== prev && handleChange()
  emitEvent(props.onNext, currentIndex.value, srcArray.value[currentIndex.value])
}

function handleClose() {
  setActive(false)
  emitEvent(props.onClose)
}

function handleShow() {
  emitEvent(props.onShow)
}

function handleHide() {
  emitEvent(props.onHide)
}
</script>

<template>
  <Masker
    v-slot="{ show }"
    :active="currentActive"
    :inherit="props.inherit"
    :class="className"
    closable
    auto-remove
    :transfer="props.transfer"
    @show="handleShow"
    @hide="handleHide"
    @toggle="setActive"
  >
    <div v-show="show" :class="nh.be('wrapper')">
      <Viewer v-bind="props.viewerProps" ref="viewer">
        <slot :src="srcArray[currentIndex]">
          <Renderer :renderer="props.slots.default" :data="{ src: srcArray[currentIndex] }">
            <img :src="srcArray[currentIndex]" />
          </Renderer>
        </slot>
      </Viewer>
      <template v-if="srcArray.length > 1">
        <button
          type="button"
          :class="[nh.be('prev'), prevDisabled && nh.bem('prev', 'disabled')]"
          @click.stop="handlePrev"
        >
          <slot name="prev" :disabled="prevDisabled">
            <Renderer :renderer="props.slots.prev" :data="{ disabled: prevDisabled }">
              <div :class="nh.be('prev-handler')">
                <Icon
                  v-bind="icons.angleLeft"
                  :scale="+(icons.angleLeft.scale || 1) * 1.4"
                  label="prev"
                ></Icon>
              </div>
            </Renderer>
          </slot>
        </button>
        <button
          type="button"
          :class="[nh.be('next'), nextDisabled && nh.bem('next', 'disabled')]"
          @click.stop="handleNext"
        >
          <slot name="next" :disabled="nextDisabled">
            <Renderer :renderer="props.slots.next" :data="{ disabled: nextDisabled }">
              <div :class="nh.be('next-handler')">
                <Icon
                  v-bind="icons.angleRight"
                  :scale="+(icons.angleRight.scale || 1) * 1.4"
                  label="next"
                ></Icon>
              </div>
            </Renderer>
          </slot>
        </button>
      </template>
      <button type="button" :class="nh.be('close')" @click.stop="handleClose">
        <slot name="close">
          <Renderer :renderer="props.slots.close">
            <div :class="nh.be('close-handler')">
              <Icon
                v-bind="icons.close"
                :scale="+(icons.close.scale || 1) * 1.4"
                label="close"
              ></Icon>
            </div>
          </Renderer>
        </slot>
      </button>
    </div>
  </Masker>
</template>
