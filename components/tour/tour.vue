<script setup lang="ts">
import { Bubble } from '@/components/bubble'
import { Button } from '@/components/button'
import { Icon } from '@/components/icon'
import { Masker } from '@/components/masker'
import { Renderer } from '@/components/renderer'

import { computed, provide, reactive, ref, shallowReadonly, toRef, watch } from 'vue'

import { getStepByWord, useIcons, useLocale, useNameHelper, useProps } from '@vexip-ui/config'
import { unrefElement, usePopper } from '@vexip-ui/hooks'
import { callIfFunc, isClient, isFunction } from '@vexip-ui/utils'
import { tourProps } from './props'
import { TOUR_STATE, getIdIndex } from './symbol'

import type { BubbleExposed } from '@/components/bubble'
import type { MaskerExposed } from '@/components/masker'
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
  signType: 'dot',
  padding: 10
})

const emit = defineEmits(['update:active', 'update:index'])

const idIndex = `${getIdIndex()}`

const nh = useNameHelper('tour')
const locale = useLocale('tour', toRef(props, 'locale'))
const icons = useIcons()

const currentActive = ref(props.active)
const currentIndex = ref(props.index)
const tempSteps = reactive(new Set<TourStepOptions>())
const currentRect = ref<number[]>()

const masker = ref<MaskerExposed>()
const bubble = ref<BubbleExposed>()

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
const padding = computed(() => {
  if (Array.isArray(props.padding)) {
    return props.padding.length === 2
      ? [props.padding[0], props.padding[1], props.padding[0], props.padding[1]]
      : props.padding
  } else {
    return new Array<number>(4).fill(props.padding)
  }
})
const maskId = computed(() => `${nh.bs(idIndex)}__mask`)

const { reference, placement, updatePopper } = usePopper({
  placement: computed(() => currentStep.value?.placement || 'bottom'),
  wrapper: computed(() => masker.value?.$el),
  popper: computed(() => bubble.value?.$el),
  arrow: computed(() => bubble.value?.arrow),
  shift: { crossAxis: true },
  autoUpdate: false
})

watch(
  () => props.active,
  value => {
    if (value) {
      start()
    } else {
      currentActive.value = value
    }
  }
)
watch(
  () => props.index,
  value => {
    currentIndex.value = Math.max(0, value)
  }
)
watch([currentActive, currentStep], () => {
  if (!isClient || !currentActive.value) return

  const target = unrefElement(callIfFunc(currentStep.value.target))

  if (!target) {
    currentRect.value = undefined
    return
  }

  const { top, left, width, height } = target.getBoundingClientRect()

  currentRect.value = [
    left - padding.value[3],
    top - padding.value[0],
    width + padding.value[1] + padding.value[3],
    height + padding.value[0] + padding.value[2]
  ]
})

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

  if (!currentActive.value) return

  if (currentIndex.value >= lastIndex) {
    if (!autoClose) return

    close()
  }

  ++currentIndex.value
  emit('update:index', currentIndex.value)
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
  <Masker
    v-model:active="currentActive"
    :inherit="props.inherit"
    :class="className"
    transfer
    auto-remove
    :disabled="props.hideMask"
    @show="updatePopper"
    @hide="currentRect = undefined"
  >
    <template #default="{ show }">
      <Bubble
        v-if="show && currentStep"
        ref="bubble"
        inherit
        :class="[nh.be('bubble'), !currentRect && nh.bem('bubble', 'center')]"
        :content-class="nh.be('step')"
        :placement="placement"
      >
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
              <div :class="[nh.be('sign'), nh.bem('sign', props.signType)]">
                <slot name="sign" v-bind="slotParams">
                  <template v-if="props.signType === 'count'">
                    <span>{{ currentIndex + 1 }}</span>
                    <span :class="nh.be('count-sep')">/</span>
                    <span>{{ allSteps.length }}</span>
                  </template>
                  <template v-else>
                    <span
                      v-for="n in allSteps.length"
                      :key="n"
                      :class="[
                        nh.be(`sign-${props.signType === 'dot' ? 'dot' : 'bar'}`),
                        n - 1 === currentIndex &&
                          nh.bem(`sign-${props.signType === 'dot' ? 'dot' : 'bar'}`, 'active')
                      ]"
                    ></span>
                  </template>
                </slot>
              </div>
              <span style="flex: auto" role="none"></span>
              <Button
                v-if="currentIndex > 0"
                inherit
                :class="nh.be('action')"
                size="small"
                @click="prev"
              >
                {{ locale.prev }}
              </Button>
              <Button
                v-if="currentIndex <= allSteps.length - 1"
                inherit
                :class="nh.be('action')"
                type="primary"
                size="small"
                @click="next()"
              >
                {{ currentIndex === allSteps.length - 1 ? locale.done : locale.next }}
              </Button>
            </slot>
          </div>
        </template>
      </Bubble>
    </template>
    <template #mask>
      <svg style="width: 100%; height: 100%">
        <defs>
          <mask :id="maskId">
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="white"
            />
            <rect
              v-if="currentRect"
              ref="reference"
              :x="currentRect[0]"
              :y="currentRect[1]"
              :width="currentRect[2]"
              :height="currentRect[3]"
              fill="white"
            />
            <rect
              v-if="currentRect"
              :class="[nh.be('hollow'), nh.bem('hollow', 'active')]"
              :x="currentRect[0]"
              :y="currentRect[1]"
              :width="currentRect[2]"
              :height="currentRect[3]"
              fill="black"
            />
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(0, 0, 0, 45%)"
          :mask="`url(#${maskId})`"
        />
      </svg>
    </template>
  </Masker>
</template>
