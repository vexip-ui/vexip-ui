<script setup lang="ts">
import { Bubble } from '@/components/bubble'
import { Icon } from '@/components/icon'
import { Masker } from '@/components/masker'
import { Renderer } from '@/components/renderer'

import { computed, provide, reactive, ref, shallowReadonly, toRef, watch } from 'vue'

import { getStepByWord, useIcons, useLocale, useNameHelper, useProps } from '@vexip-ui/config'
import { isFunction } from '@vexip-ui/utils'
import { tourProps } from './props'
import { TOUR_STATE } from './symbol'

import type { TourStepOptions } from './symbol'

const _props = defineProps(tourProps)
const props = useProps('tour', _props, {
  locale: null,
  active: false,
  index: {
    default: 0,
    validator: value => value >= 0
  },
  steps: () => [],
  hideMask: false,
  signType: 'dot'
})

const emit = defineEmits(['update:active', 'update:index'])

const nh = useNameHelper('tour')
const locale = useLocale('tour', toRef(props, 'locale'))
const icons = useIcons()

const currentActive = ref(props.active)
const currentIndex = ref(props.index)
const tempSteps = reactive(new Set<TourStepOptions>())

const allSteps = computed(() => Array.from(tempSteps).concat(props.steps))
const currentStep = computed(() => allSteps.value[currentIndex.value])
const className = computed(() => {
  return [
    nh.b(),
    nh.bs('vars'),
    {
      [nh.bm('hide-mask')]: props.hideMask
    }
  ]
})

watch(
  () => props.active,
  value => {
    currentActive.value = value
  }
)
watch(
  () => props.index,
  value => {
    currentIndex.value = Math.max(0, value)
  }
)

provide(TOUR_STATE, {
  increaseStep,
  decreaseStep
})

defineExpose({ start, prev, next, close })

const actions = { start, prev, next, close }
const slotParams = shallowReadonly(
  reactive({
    ...actions,
    step: currentStep,
    index: currentIndex
  })
)

function increaseStep(step: TourStepOptions) {
  tempSteps.add(step)
}

function decreaseStep(step: TourStepOptions) {
  tempSteps.delete(step)
}

function start() {
  if (currentActive.value) return

  currentActive.value = true
  emit('update:active', true)

  if (currentIndex.value) {
    currentIndex.value = 0
    emit('update:index', 0)
  }
}

function prev() {
  if (!currentActive.value || currentIndex.value <= 0) return

  --currentIndex.value
  emit('update:index', currentIndex.value)
}

function next(autoClose = true) {
  const lastIndex = allSteps.value.length - 1

  if (!currentActive.value || currentIndex.value >= lastIndex) return

  ++currentIndex.value
  emit('update:index', currentIndex.value)

  if (currentIndex.value >= lastIndex && autoClose) {
    close()
  }
}

function close() {
  if (!currentActive.value) return

  currentActive.value = false
  emit('update:active', false)
}
</script>

<template>
  <div v-show="false" role="none" aria-hidden="true">
    <slot></slot>
  </div>
  <Masker :class="className" :disabled="props.hideMask">
    <template #default="{ show }">
      <Bubble v-show="show && currentStep" :class="nh.be('bubble')">
        <Renderer
          v-if="isFunction(currentStep.renderer)"
          :renderer="currentStep.renderer"
          :data="actions"
        ></Renderer>
        <template v-else>
          <div :class="nh.be('header')">
            <slot name="header" v-bind="slotParams">
              <div :class="nh.be('title')">
                <slot name="title" v-bind="slotParams">
                  {{ currentStep.title ?? getStepByWord(locale.stepCount, currentIndex) }}
                </slot>
              </div>
              <button type="button" :class="nh.be('close')" @click="close">
                <slot name="close" v-bind="slotParams">
                  <Icon v-bind="icons.close" :scale="1.2" label="close"></Icon>
                </slot>
              </button>
            </slot>
          </div>
          <div :class="nh.be('content')">
            <slot name="body" v-bind="slotParams">
              {{ currentStep.content }}
            </slot>
          </div>
          <div :class="nh.be('footer')">
            <slot name="footer" v-bind="slotParams">
              <div :class="nh.be('sign')">
                <slot name="sign" v-bind="slotParams"></slot>
              </div>
            </slot>
          </div>
        </template>
      </Bubble>
    </template>
  </Masker>
</template>
