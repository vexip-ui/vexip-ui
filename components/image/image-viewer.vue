<template>
  <Masker
    v-slot="{ show }"
    v-model:active="currentActive"
    :inherit="props.inherit"
    :class="className"
    closable
    auto-remove
    :transfer="props.transfer"
    @show="handleShow"
    @hide="handleHide"
  >
    <div v-show="show" :class="nh.be('wrapper')">
      <Viewer ref="viewer">
        <slot :src="srcList[currentIndex]">
          <img :src="srcList[currentIndex]" />
        </slot>
      </Viewer>
      <template v-if="srcList.length > 1">
        <button
          type="button"
          :class="[nh.be('prev'), prevDisabled && nh.bem('prev', 'disabled')]"
          @click.stop="handlePrev"
        >
          <slot name="prev" :disabled="prevDisabled">
            <div :class="nh.be('prev-handler')">
              <Icon
                v-bind="icons.angleLeft"
                :scale="+(icons.angleLeft.scale || 1) * 1.4"
                label="prev"
              ></Icon>
            </div>
          </slot>
        </button>
        <button
          type="button"
          :class="[nh.be('next'), nextDisabled && nh.bem('next', 'disabled')]"
          @click.stop="handleNext"
        >
          <slot name="next" :disabled="prevDisabled">
            <div :class="nh.be('next-handler')">
              <Icon
                v-bind="icons.angleRight"
                :scale="+(icons.angleRight.scale || 1) * 1.4"
                label="next"
              ></Icon>
            </div>
          </slot>
        </button>
      </template>
      <button type="button" :class="nh.be('close')" @click.stop="handleClose">
        <slot name="close">
          <div :class="nh.be('close-handler')">
            <Icon
              v-bind="icons.close"
              :scale="+(icons.close.scale || 1) * 1.4"
              label="close"
            ></Icon>
          </div>
        </slot>
      </button>
    </div>
  </Masker>
</template>

<script lang="ts">
import { Icon } from '@/components/icon'
import { Masker } from '@/components/masker'
import { Viewer } from '@/components/viewer'

import { computed, defineComponent, ref, watch } from 'vue'

import { emitEvent, useIcons, useNameHelper, useProps } from '@vexip-ui/config'
import { boundRange } from '@vexip-ui/utils'
import { imageViewerProps } from './props'

export default defineComponent({
  name: 'ImageViewer',
  components: {
    Icon,
    Masker,
    Viewer
  },
  props: imageViewerProps,
  emits: ['update:active', 'update:index'],
  setup(_props, { emit }) {
    const nh = useNameHelper('image-viewer')
    const props = useProps('imageViewer', _props, {
      active: false,
      index: 0,
      srcs: {
        default: '',
        static: true
      },
      transfer: false
    })

    const currentActive = ref(props.active)
    const currentIndex = ref(props.index)

    const viewer = ref<InstanceType<typeof Viewer>>()

    const className = computed(() => {
      return [nh.b(), nh.ns('image-vars'), props.inherit && nh.bm('inherit')]
    })
    const srcList = computed(() => (Array.isArray(props.srcs) ? props.srcs : [props.srcs]))
    const prevDisabled = computed(() => currentIndex.value <= 0)
    const nextDisabled = computed(() => currentIndex.value >= srcList.value.length - 1)

    watch(
      () => props.active,
      value => {
        currentActive.value = value
      }
    )
    watch(
      () => props.index,
      value => {
        currentIndex.value = value
      }
    )
    watch(() => srcList.value.length, verifyIndex)

    function setActive(active: boolean) {
      if (currentActive.value === active) return

      currentActive.value = active

      emit('update:active', active)
      emitEvent(props.onToggle, active)
    }

    function verifyIndex() {
      currentIndex.value = boundRange(currentIndex.value, 0, srcList.value.length - 1)
    }

    function handleChange() {
      const value = currentIndex.value

      viewer.value?.handleReset()
      emit('update:index', value)
      emitEvent(props.onChange, value, srcList.value[value])
    }

    function handlePrev() {
      if (prevDisabled.value) return

      const prev = currentIndex.value

      currentIndex.value--
      verifyIndex()
      currentIndex.value !== prev && handleChange()
      emitEvent(props.onPrev, currentIndex.value, srcList.value[currentIndex.value])
    }

    function handleNext() {
      if (nextDisabled.value) return

      const prev = currentIndex.value

      currentIndex.value++
      verifyIndex()
      currentIndex.value !== prev && handleChange()
      emitEvent(props.onNext, currentIndex.value, srcList.value[currentIndex.value])
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

    return {
      props,
      nh,
      icons: useIcons(),

      currentActive,
      currentIndex,

      className,
      srcList,
      prevDisabled,
      nextDisabled,

      viewer,

      handlePrev,
      handleNext,
      handleClose,
      handleShow,
      handleHide
    }
  }
})
</script>
