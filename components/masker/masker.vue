<script setup lang="ts">
import { Portal } from '@/components/portal'
import { ResizeObserver } from '@/components/resize-observer'

import { computed, nextTick, ref, watch } from 'vue'

import { emitEvent, useNameHelper, useProps, useZIndex } from '@vexip-ui/config'
import { getLast, isPromise, queryTabables } from '@vexip-ui/utils'
import { maskerProps } from './props'

defineOptions({ name: 'Masker' })

const nh = useNameHelper('masker')
const _props = defineProps(maskerProps)
const props = useProps('masker', _props, {
  active: {
    default: false,
    static: true
  },
  closable: false,
  inner: false,
  maskTransition: () => nh.ns('fade'),
  transitionName: () => nh.ns('fade'),
  disabled: false,
  onBeforeClose: {
    default: null,
    isFunc: true
  },
  transfer: false,
  autoRemove: false,
  permeable: false,
  disableEsc: false
})

const emit = defineEmits(['update:active'])

const slots = defineSlots<{
  mask?: () => any,
  default?: (params: { show: boolean }) => any
}>()

const getIndex = useZIndex()

const currentActive = ref(props.active)
// If initial active, we should set a valid index as initial value
const zIndex = ref(props.active ? getIndex() : 0)
const wrapperShow = ref(props.active)

const wrapper = ref<HTMLElement>()
const topTrap = ref<HTMLElement>()
const bottomTrap = ref<HTMLElement>()

let maskShow = false
let contentShow = false
let stable = false
let prevFocusedEl: HTMLElement | null = null

const transferTo = computed(() => {
  return props.inner
    ? ''
    : typeof props.transfer === 'boolean'
      ? props.transfer
        ? 'body'
        : ''
      : props.transfer
})
const className = computed(() => {
  return [
    nh.b(),
    nh.bs('vars'),
    {
      [nh.bm('inherit')]: transferTo.value !== 'body' && props.inherit,
      [nh.bm('inner')]: props.inner,
      [nh.bm('disabled')]: props.disabled
    }
  ]
})

watch(
  () => props.active,
  value => {
    currentActive.value = value

    if (value) {
      wrapperShow.value = value
    }
  }
)
watch(currentActive, value => {
  if (!value) {
    stable = false

    if (prevFocusedEl) {
      prevFocusedEl.focus()
      prevFocusedEl = null
    }
  } else {
    prevFocusedEl = document.activeElement as HTMLElement
    zIndex.value = getIndex()
  }

  if ((!props.maskTransition || props.disabled) && !props.transitionName) {
    value ? afterOpen() : afterClose()
  }
})
watch(
  [() => props.permeable, wrapper],
  () => {
    if (wrapper.value) {
      wrapper.value.removeEventListener('wheel', disableWheel)

      if (!props.permeable) {
        wrapper.value.addEventListener('wheel', disableWheel)
      }
    }
  },
  { immediate: true, flush: 'post' }
)

defineExpose({
  currentActive,
  zIndex,
  wrapperShow,
  wrapper,
  topTrap,
  bottomTrap
})

function disableWheel(event: WheelEvent) {
  event.preventDefault()
  event.stopPropagation()
}

function toggleActive(active: boolean) {
  if (currentActive.value === active) return

  currentActive.value = active

  emit('update:active', active)
  emitEvent(props.onToggle, active)
}

async function handleClose() {
  if (!props.closable) return

  let result: unknown = true

  if (typeof props.onBeforeClose === 'function') {
    result = props.onBeforeClose()

    if (isPromise(result)) {
      result = await result
    }
  }

  if (result !== false) {
    nextTick(() => {
      toggleActive(false)
      emitEvent(props.onClose)
    })
  }
}

function afterOpen() {
  if (!currentActive.value) return

  const activeEl = document && document.activeElement

  if (!activeEl || !wrapper.value || !wrapper.value.contains(activeEl)) {
    topTrap.value?.focus()
  }

  nextTick(() => {
    stable = true
    emitEvent(props.onShow)
  })
}

function afterClose() {
  if (currentActive.value) return

  nextTick(() => {
    wrapperShow.value = false
    emitEvent(props.onHide)
  })
}

function afterMaskOpen() {
  if (!currentActive.value) return

  maskShow = true
  ;(!props.transitionName || !slots.default || contentShow) && afterOpen()
}

function afterMaskClose() {
  if (currentActive.value) return

  maskShow = false
  ;(!props.transitionName || !slots.default || !contentShow) && afterClose()
}

function afterContentOpen() {
  if (!currentActive.value) return

  contentShow = true
  ;(!props.maskTransition || props.disabled || maskShow) && afterOpen()
}

function afterContentClose() {
  if (currentActive.value) return

  contentShow = false
  ;(!props.maskTransition || props.disabled || !maskShow) && afterClose()
}

function handleMaskClick(event: MouseEvent) {
  emitEvent(props.onMaskClick, event)
  handleClose()
}

function handleFocusIn(event: FocusEvent) {
  const target = event.target as HTMLElement

  if (!stable || !wrapper.value || !target || !topTrap.value || !bottomTrap.value) {
    return
  }

  const tabables = queryTabables(wrapper.value)

  if (!tabables.length) {
    return
  }

  if (topTrap.value === target) {
    getLast(tabables)!.focus()
  } else if (bottomTrap.value === target) {
    tabables[0].focus()
  }
}

function handleResize(entry: ResizeObserverEntry) {
  emitEvent(props.onResize, entry)
}

function handleEscape(event: KeyboardEvent) {
  if (!props.disableEsc) {
    event.preventDefault()
    handleClose()
  }
}
</script>

<template>
  <Portal v-if="!props.autoRemove || wrapperShow" :to="transferTo">
    <div
      v-bind="$attrs"
      ref="wrapper"
      :class="className"
      tabindex="-1"
      :style="{
        zIndex,
        pointerEvents: wrapperShow ? undefined : 'none',
        visibility: wrapperShow ? undefined : 'hidden'
      }"
      @focusin="handleFocusIn"
      @keydown.escape="handleEscape"
    >
      <ResizeObserver @resize="handleResize">
        <Transition
          v-if="!props.disabled"
          appear
          :name="props.maskTransition"
          @after-enter="afterMaskOpen"
          @after-leave="afterMaskClose"
        >
          <div v-show="currentActive" :class="nh.be('mask')" @click="handleMaskClick">
            <slot name="mask">
              <div :class="nh.be('mask-inner')"></div>
            </slot>
          </div>
        </Transition>
        <div
          v-else
          :class="nh.be('placeholder')"
          role="none"
          aria-hidden
        ></div>
      </ResizeObserver>
      <div
        ref="topTrap"
        tabindex="0"
        role="none"
        style="width: 0; height: 0; overflow: hidden; outline: none"
      ></div>
      <div :class="nh.be('content')" @wheel.stop.prevent>
        <Transition
          v-if="props.transitionName"
          appear
          :name="props.transitionName"
          @after-enter="afterContentOpen"
          @after-leave="afterContentClose"
        >
          <slot :show="currentActive"></slot>
        </Transition>
        <slot v-else :show="currentActive"></slot>
      </div>
      <div
        ref="bottomTrap"
        tabindex="0"
        role="none"
        style="width: 0; height: 0; overflow: hidden; outline: none"
      ></div>
    </div>
  </Portal>
</template>
