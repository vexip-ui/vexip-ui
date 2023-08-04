<script setup lang="ts">
import { computed, provide, reactive, ref, watch } from 'vue'

import { useNameHelper, useProps } from '@vexip-ui/config'
import { tourProps } from './props'
import { TOUR_STATE } from './symbol'

import type { TourStepOptions } from './symbol'

const _props = defineProps(tourProps)
const props = useProps('tour', _props, {
  active: false,
  index: {
    default: 0,
    validator: value => value >= 0
  },
  steps: () => [],
  hideMask: false
})

const emit = defineEmits(['update:active', 'update:index'])

const nh = useNameHelper('tour')

const currentActive = ref(props.active)
const currentIndex = ref(props.index)
const tempSteps = reactive(new Set<TourStepOptions>())

const allSteps = computed(() => Array.from(tempSteps).concat(props.steps))
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
  <div :class="className">
    <div v-show="false" role="none">
      <slot></slot>
    </div>
  </div>
</template>
