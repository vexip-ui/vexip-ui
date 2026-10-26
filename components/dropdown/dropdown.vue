<script setup lang="ts">
import { Popper } from '@/components/popper'

import { computed, inject, nextTick, onMounted, provide, reactive, ref, toRef, watch } from 'vue'

import {
  placementWhileList,
  useClickOutside,
  usePopper,
  useRtl,
  useSetTimeout,
} from '@vexip-ui/hooks'
import { emitEvent, useHoverDelay, useNameHelper, useProps } from '@vexip-ui/config'
import DropdownDrop from './dropdown-drop'
import { dropdownProps } from './props'
import { useLabel } from './hooks'
import { DROPDOWN_STATE, SELECT_HANDLER } from './symbol'

import type { PopperExposed } from '@/components/popper'
import type { Placement } from '@vexip-ui/hooks'

defineOptions({ name: 'Dropdown' })

const nh = useNameHelper('dropdown')

const _props = defineProps(dropdownProps)
const props = useProps('dropdown', _props, {
  visible: {
    default: false,
    static: true,
  },
  placement: {
    default: 'bottom',
    validator: value => placementWhileList.includes(value),
  },
  outsideClose: true,
  trigger: {
    default: 'hover',
    validator: value => ['hover', 'click', 'custom'].includes(value),
  },
  label: {
    default: null,
    static: true,
  },
  transitionName: () => nh.ns('drop'),
  transfer: false,
  dropClass: null,
  appear: false,
  meta: null,
  alive: false,
  custom: false,
  shift: true,
})

const emit = defineEmits(['update:visible'])

const parentState = inject(DROPDOWN_STATE, null)
const { isRtl } = useRtl()
const hoverDelay = useHoverDelay()

const isNested = !!parentState
const label = toRef(props, 'label')
const placement = ref(props.placement)
const currentVisible = ref(props.visible)
const popperAlive = ref(false)

const transfer = isNested ? ref(false) : toRef(props, 'transfer')

const shift = computed(() => !!(parentState?.shift || props.shift))

const wrapper = useClickOutside(handleClickOutside)
const popper = ref<PopperExposed>()
const { reference, transferTo, updatePopper } = usePopper({
  placement,
  shift,
  transfer,
  wrapper,
  popper: computed(() => popper.value?.wrapper),
  isDrop: true,
  offset: isNested ? [-5, 0] : undefined,
})
const currentLabel = useLabel(label, reference)

const className = computed(() => {
  return {
    [nh.b()]: true,
    [nh.bs('vars')]: true,
    [nh.bm('inherit')]: props.inherit,
    [nh.bm('visible')]: currentVisible.value,
  }
})
const isAlive = computed(() => parentState?.alive || props.alive)

provide(SELECT_HANDLER, null!)
!props.custom &&
  provide(
    DROPDOWN_STATE,
    reactive({
      alive: isAlive,
      shift,
      handleSelect,
      handleTriggerEnter,
      handleTriggerLeave,
    }),
  )

watch(
  () => props.visible,
  value => {
    currentVisible.value = value
  },
)

watch(
  () => props.placement,
  value => {
    setPlacement(value)
  },
)

watch(currentVisible, value => {
  if (value) {
    updatePopper()
  }
})

onMounted(() => {
  nextTick(() => {
    setPlacement(props.placement)
  })
})

defineExpose({
  isNested,
  currentVisible,
  isAlive,
  wrapper,
  reference,
  popper,
  handleTriggerEnter,
  handleTriggerLeave,
  handleTriggerClick,
})

function setVisible(visible: boolean) {
  if (currentVisible.value === visible) return

  currentVisible.value = visible

  emit('update:visible', visible)
  emitEvent(props.onToggle, visible)
}

function handleClickOutside() {
  emitEvent(props.onClickOutside)

  if (props.outsideClose && props.trigger !== 'custom' && currentVisible.value) {
    setVisible(false)
    emitEvent(props.onOutsideClose)
  }
}

function handleSelect(labels: (string | number)[], metaList: Array<Record<string, any>>) {
  if (props.trigger !== 'custom') {
    setVisible(false)
    emitEvent(props.onSelect, labels, metaList)
  }

  if (typeof parentState?.handleSelect === 'function') {
    parentState.handleSelect([currentLabel.value!, ...labels], [props.meta || {}, ...metaList])
  }
}

function setPlacement(value: Placement) {
  const [xPlacement] = value.split('-')

  if (isNested && xPlacement !== 'right' && xPlacement !== 'left') {
    placement.value = isRtl.value ? 'left-start' : 'right-start'
  } else {
    placement.value = value
  }
}

const { timer } = useSetTimeout()

function handleTriggerEnter() {
  if (props.trigger === 'hover') {
    clearTimeout(timer.hover)

    if (typeof parentState?.handleTriggerEnter === 'function') {
      parentState.handleTriggerEnter()
    }

    timer.hover = setTimeout(() => {
      setVisible(true)
    }, hoverDelay.value)
  }
}

function handleTriggerLeave() {
  if (props.trigger === 'hover') {
    clearTimeout(timer.hover)

    if (typeof parentState?.handleTriggerLeave === 'function') {
      parentState.handleTriggerLeave()
    }

    timer.hover = setTimeout(() => {
      setVisible(false)
    }, hoverDelay.value)
  }
}

function handleTriggerClick() {
  if (props.trigger === 'click') {
    setVisible(!currentVisible.value)
  }
}
</script>

<template>
  <div
    ref="wrapper"
    :class="className"
    @mouseenter="handleTriggerEnter"
    @mouseleave="handleTriggerLeave"
  >
    <div
      ref="reference"
      :class="[nh.be('trigger'), currentVisible ? nh.bem('trigger', 'active') : '']"
      @click="handleTriggerClick"
      @keydown.enter.prevent="handleTriggerClick"
      @keydown.space.prevent="handleTriggerClick"
    >
      <slot></slot>
    </div>
    <DropdownDrop>
      <Popper
        ref="popper"
        :class="[
          nh.be('popper'),
          nh.bs('vars'),
          isNested ? nh.bem('popper', 'nested') : null,
          props.dropClass
        ]"
        :visible="currentVisible"
        :alive="isAlive || popperAlive"
        :to="transferTo"
        :transition="props.transitionName"
        :appear="props.appear"
        @mouseenter="handleTriggerEnter"
        @mouseleave="handleTriggerLeave"
        @after-enter="popperAlive = true"
        @after-leave="popperAlive = false"
      >
        <slot name="drop"></slot>
      </Popper>
    </DropdownDrop>
  </div>
</template>
