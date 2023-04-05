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
              <Icon v-bind="icons.arrowLeft" :scale="1.4" label="prev"></Icon>
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
              <Icon v-bind="icons.arrowRight" :scale="1.4" label="next"></Icon>
            </div>
          </slot>
        </button>
      </template>
      <button type="button" :class="nh.be('close')" @click.stop="handleClose">
        <slot name="close">
          <div :class="nh.be('close-handler')">
            <Icon v-bind="icons.close" :scale="1.4" label="close"></Icon>
          </div>
        </slot>
      </button>
    </div>
  </Masker>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import { Icon } from '@/components/icon'
import { Masker } from '@/components/masker'
import { Viewer } from '@/components/viewer'
import { useNameHelper, useProps, useIcons, emitEvent } from '@vexip-ui/config'
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
      return [nh.b(), nh.ns('image-vars')]
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
    watch(currentActive, value => {
      emitEvent(props.onToggle, value)
      emit('update:active', value)
    })
    watch(
      () => props.index,
      value => {
        currentIndex.value = value
      }
    )
    watch(currentIndex, value => {
      viewer.value?.handleReset()
      emitEvent(props.onChange, value, srcList.value[value])
      emit('update:index', value)
    })
    watch(() => srcList.value.length, verifyIndex)

    function verifyIndex() {
      currentIndex.value = boundRange(currentIndex.value, 0, srcList.value.length - 1)
    }

    function handlePrev() {
      if (prevDisabled.value) return

      currentIndex.value--
      verifyIndex()
      emitEvent(props.onPrev, currentIndex.value, srcList.value[currentIndex.value])
    }

    function handleNext() {
      if (nextDisabled.value) return

      currentIndex.value++
      verifyIndex()
      emitEvent(props.onNext, currentIndex.value, srcList.value[currentIndex.value])
    }

    function handleClose() {
      currentActive.value = false
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
