<script setup lang="ts">
import { Icon } from '@/components/icon'
import { Renderer } from '@/components/renderer'

import { computed, ref, watch } from 'vue'

import { createIconProp, emitEvent, useIcons, useNameHelper, useProps } from '@vexip-ui/config'
import { toNumber } from '@vexip-ui/utils'
import { spinProps } from './props'

import type { SpinSlots } from './symbol'

defineOptions({ name: 'Spin' })

const nh = useNameHelper('spin')
const _props = defineProps(spinProps)
const props = useProps('spin', _props, {
  active: {
    default: false,
    static: true,
  },
  icon: createIconProp(),
  inner: false,
  delay: false,
  tip: '',
  hideMask: false,
  maskColor: '',
  maskClass: null,
  transitionName: () => nh.ns('fade'),
  iconEffect: null,
  slots: () => ({}),
})

const slots = defineSlots<SpinSlots>()

const icons = useIcons()

const currentActive = ref(props.active)

const hasTip = computed(() => !!(props.tip || slots.tip))
const maskStyle = computed(() => {
  const style = {} as any

  if (props.maskColor) {
    style[nh.cv('mask-bg-color')] = props.maskColor
  }

  return style
})
const delayTime = computed(() => {
  if (props.delay) {
    if (props.delay === true) {
      return { enter: 500, leave: 500 }
    }

    if (typeof props.delay === 'number') {
      return { enter: props.delay, leave: props.delay }
    }

    if (Array.isArray(props.delay)) {
      return { enter: toNumber(props.delay[0]), leave: toNumber(props.delay[1]) }
    }
  }

  return { enter: 0, leave: 0 }
})

let timer: ReturnType<typeof setTimeout>

watch(
  () => props.active,
  value => {
    clearTimeout(timer)

    const delay = value ? delayTime.value.enter : delayTime.value.leave

    if (delay) {
      timer = setTimeout(() => {
        currentActive.value = value
      }, delay)
    } else {
      currentActive.value = value
    }
  },
)

defineExpose({
  currentActive,
  hasTip,
  handleShow,
  handleHide,
})

function handleMaskClick(event: MouseEvent) {
  emitEvent(props.onMaskClick, event)
}

function handleShow() {
  emitEvent(props.onShow)
}

function handleHide() {
  emitEvent(props.onHide)
}
</script>

<template>
  <div
    v-if="!props.inner"
    :class="[nh.b(), nh.bs('vars'), props.inherit && nh.bm('inherit')]"
    :aria-busy="currentActive ? 'true' : undefined"
  >
    <slot>
      <Renderer :renderer="props.slots.default"></Renderer>
    </slot>
    <Transition
      appear
      :name="props.transitionName"
      @after-enter="handleShow"
      @after-leave="handleHide"
    >
      <div v-if="currentActive" :class="nh.be('loading')">
        <div
          v-if="!props.hideMask"
          :class="[nh.be('mask'), props.maskClass]"
          :style="maskStyle"
          @click="handleMaskClick"
        ></div>
        <slot name="content">
          <Renderer :renderer="props.slots.content">
            <div :class="nh.be('icon')">
              <slot name="icon">
                <Renderer :renderer="props.slots.icon">
                  <Icon
                    v-bind="icons.loading"
                    :icon="props.icon || icons.loading.icon"
                    :effect="props.iconEffect || icons.loading.effect"
                    label="loading"
                  ></Icon>
                </Renderer>
              </slot>
            </div>
            <div v-if="hasTip" :class="nh.be('tip')">
              <slot name="tip">
                <Renderer :renderer="props.slots.tip">
                  {{ props.tip }}
                </Renderer>
              </slot>
            </div>
          </Renderer>
        </slot>
      </div>
    </Transition>
  </div>
  <Transition
    v-else
    appear
    :name="props.transitionName"
    @after-enter="handleShow"
    @after-leave="handleHide"
  >
    <div v-if="currentActive" :class="[nh.b(), nh.bs('vars'), nh.bm('inner')]">
      <div
        v-if="!props.hideMask"
        :class="[nh.be('mask'), props.maskClass]"
        :style="maskStyle"
        @click="handleMaskClick"
      ></div>
      <slot name="content">
        <Renderer :renderer="props.slots.content">
          <div :class="nh.be('icon')">
            <slot name="icon">
              <Renderer :renderer="props.slots.icon">
                <Icon
                  v-bind="icons.loading"
                  :icon="props.icon || icons.loading.icon"
                  :effect="props.iconEffect || icons.loading.effect"
                  label="loading"
                ></Icon>
              </Renderer>
            </slot>
          </div>
          <div v-if="hasTip" :class="nh.be('tip')">
            <slot name="tip">
              <Renderer :renderer="props.slots.tip">
                {{ props.tip }}
              </Renderer>
            </slot>
          </div>
        </Renderer>
      </slot>
    </div>
  </Transition>
</template>
