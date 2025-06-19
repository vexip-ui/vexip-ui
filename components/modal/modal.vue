<script setup lang="ts">
import { Button } from '@/components/button'
import { Icon } from '@/components/icon'
import { Masker } from '@/components/masker'
import { Renderer } from '@/components/renderer'
import { ResizeObserver } from '@/components/resize-observer'

import { computed, nextTick, reactive, ref, shallowReadonly, toRef, watch } from 'vue'

import {
  createSizeProp,
  emitEvent,
  useIcons,
  useId,
  useLocale,
  useNameHelper,
  useProps,
} from '@vexip-ui/config'
import { useMoving } from '@vexip-ui/hooks'
import { isNull, isPromise, isValidNumber, toNumber } from '@vexip-ui/utils'
import { modalProps, positionProp } from './props'

import type { MaskerExposed } from '@/components/masker'
import type { ModalSlots } from './symbol'

defineOptions({ name: 'Modal' })

const nh = useNameHelper('modal')

const _props = defineProps(modalProps)
const props = useProps('modal', _props, {
  locale: null,
  transfer: false,
  active: {
    default: false,
    static: true,
  },
  width: positionProp,
  height: positionProp,
  top: positionProp,
  left: positionProp,
  right: positionProp,
  bottom: positionProp,
  title: '',
  closable: true,
  inner: false,
  maskClose: true,
  modalClass: null,
  modalStyle: null,
  noFooter: false,
  hideMask: false,
  draggable: false,
  resizable: false,
  onBeforeClose: {
    default: null,
    isFunc: true,
  },
  loading: false,
  minWidth: 150,
  minHeight: 120,
  transitionName: () => nh.ns('ease'),
  confirmText: null,
  cancelText: null,
  autoRemove: false,
  confirmType: 'primary',
  confirmProps: null,
  cancelType: 'default',
  cancelProps: null,
  actionSize: createSizeProp('small'),
  undivided: false,
  xOffset: 0,
  yOffset: 0,
  disableEsc: false,
  slots: () => ({}),
})

const emit = defineEmits(['update:active'])

const slots = defineSlots<ModalSlots>()

const locale = useLocale('modal', toRef(props, 'locale'))
const icons = useIcons()

function isSpecified(value?: string | number) {
  return !isNull(value) && value !== 'auto'
}

function normalizeStyle(value?: string | number) {
  return isValidNumber(value, true)
    ? `${toNumber(value)}px`
    : isNull(value)
      ? 'auto'
      : String(value)
}

const currentActive = ref(props.active)
const rect = reactive({
  top: normalizeStyle(props.top),
  right: normalizeStyle(props.right),
  bottom: normalizeStyle(props.bottom),
  left: normalizeStyle(props.left),
  width: normalizeStyle(props.width),
  height: normalizeStyle(props.height),
})
const maskerRect = reactive({ width: 0, height: 0 })
const modalRect = reactive({ width: 0, height: 0 })

const transformed = ref(false)

const masker = ref<MaskerExposed>()
const wrapper = ref<HTMLElement>()
const footer = ref<HTMLElement>()

const uselessTop = computed(() => {
  return props.top === 'auto' && isSpecified(props.bottom) && isSpecified(props.height)
})
const uselessLeft = computed(() => {
  return props.left === 'auto' && isSpecified(props.right) && isSpecified(props.width)
})

const { target: header, moving: dragging } = useMoving({
  capture: false,
  onStart: (state, event) => {
    if (!wrapper.value || !props.draggable || event.button > 0) {
      return false
    }

    transferRect(false)

    transformed.value = true
    state.xStart = parseFloat(rect.left)
    state.yStart = parseFloat(rect.top)

    emitEvent(props.onDragStart, {
      top: state.yStart,
      left: state.xStart,
    })
  },
  onMove: state => {
    rect.left = `${state.xEnd}px`
    rect.top = `${state.yEnd}px`

    emitEvent(props.onDragMove, {
      top: state.yEnd,
      left: state.xEnd,
    })
  },
  onEnd: state => {
    emitEvent(props.onDragEnd, {
      top: state.yEnd,
      left: state.xEnd,
    })
  },
})

const { target: resizer, moving: resizing } = useMoving({
  onStart: (state, event) => {
    if (!wrapper.value || !props.resizable || event.button > 0) {
      return false
    }

    transferRect()

    let minHeight = 32

    if (header.value) {
      minHeight += header.value.offsetHeight
    }

    if (footer.value) {
      minHeight += footer.value.offsetHeight
    }

    transformed.value = true
    state.xStart = parseFloat(rect.width)
    state.yStart = parseFloat(rect.height)
    state.minHeight = Math.max(minHeight, props.minHeight)

    emitEvent(props.onResizeStart, {
      width: state.xStart,
      height: state.yStart,
    })
  },
  onMove: state => {
    const width = Math.max(props.minWidth, state.xEnd, 32)
    const height = Math.max(state.minHeight as number, state.yEnd)

    rect.width = `${width}px`
    rect.height = `${height}px`

    emitEvent(props.onResizeMove, { width, height })
  },
  onEnd: state => {
    const width = Math.max(props.minWidth, state.xEnd, 32)
    const height = Math.max(state.minHeight as number, state.yEnd)

    emitEvent(props.onResizeEnd, { width, height })
  },
})

// const shouldParse = computed(() => !props.draggable && !props.resizable)
const className = computed(() => {
  return [
    nh.b(),
    nh.bs('vars'),
    {
      [nh.bm('inherit')]: props.inherit,
      [nh.bm('inner')]: props.inner,
      [nh.bm('draggable')]: props.draggable,
      [nh.bm('resizable')]: props.resizable,
      [nh.bm('undivided')]: props.undivided,
    },
  ]
})
const wrapperClass = computed(() => {
  return [
    nh.be('wrapper'),
    {
      [nh.bem('wrapper', 'closable')]: props.closable,
      [nh.bem('wrapper', 'dragging')]: dragging.value,
      [nh.bem('wrapper', 'resizing')]: resizing.value,
    },
    props.modalClass,
  ]
})
const transform = computed(() => {
  const transforms: string[] = []

  if (props.xOffset) {
    transforms.push(`translateX(${normalizeStyle(props.xOffset)})`)
  }

  if (props.yOffset) {
    transforms.push(`translateY(${normalizeStyle(props.yOffset)})`)
  }

  if (transforms.length) {
    transforms.push('translateZ(0)')
  }

  return transforms.length ? transforms.join(' ') : undefined
})
const wrapperStyle = computed(() => {
  return [
    props.modalStyle,
    {
      ...rect,
      height: rect.height !== 'auto' ? rect.height : undefined,
      transform: transform.value,
    },
  ]
})
const transformOrigin = computed(() => {
  const origin = { x: '50%', y: '50%' }

  if (transformed.value) {
    origin.x = `${parseFloat(rect.left) + 0.5 * modalRect.width}px`
    origin.y = `${parseFloat(rect.top) + 0.5 * modalRect.height}px`
  } else {
    if (uselessTop.value) {
      origin.y = `calc(100% - ${parseFloat(rect.bottom) + 0.5 * parseFloat(rect.height)}px)`
    } else if (isSpecified(props.top)) {
      const top = parseFloat(rect.top)

      if (isSpecified(props.height)) {
        origin.y = `${top + 0.5 * parseFloat(rect.height)}px`
      } else if (isSpecified(props.bottom)) {
        const bottom = parseFloat(rect.bottom)
        const height = maskerRect.height - top - bottom

        origin.y = `${top + 0.5 * height}px`
      } else {
        origin.y = `${parseFloat(rect.top) + 0.5 * modalRect.height}px`
      }
    }

    if (uselessLeft.value) {
      origin.x = `calc(100% - ${parseFloat(rect.right) + 0.5 * parseFloat(rect.width)}px)`
    } else if (isSpecified(props.left)) {
      const left = parseFloat(rect.left)

      if (isSpecified(props.width)) {
        origin.x = `${left + 0.5 * parseFloat(rect.width)}px`
      } else if (isSpecified(props.right)) {
        const right = parseFloat(rect.right)
        const width = maskerRect.width - left - right

        origin.x = `${left + 0.5 * width}px`
      } else {
        origin.x = `${parseFloat(rect.left) + 0.5 * modalRect.width}px`
      }
    }
  }

  return `${origin.x} ${origin.y}`
})
const hasHeader = computed(() => {
  return !!(slots.header || slots.title || props.title || props.slots.header || props.slots.title)
})
const titleId = useId()
const bodyId = useId()

for (const style of Object.keys(rect) as Array<keyof typeof rect>) {
  watch(
    () => props[style],
    value => {
      rect[style] = normalizeStyle(value)
    },
  )
}

watch(
  () => props.active,
  value => {
    currentActive.value = value
  },
)
watch(currentActive, value => {
  props.hideMask && value && handleResize()
})
watch([() => props.top, () => props.bottom, () => props.height], () => {
  currentActive.value && nextTick(computeTop)
})
watch([() => props.left, () => props.right, () => props.width], () => {
  currentActive.value && nextTick(computeLeft)
})

const handleResize = () => {
  if (currentActive.value && !transformed.value) {
    nextTick(() => {
      computeTop()
      computeLeft()
    })
  }

  if (masker.value?.wrapper) {
    maskerRect.width = masker.value.wrapper.offsetWidth
    maskerRect.height = masker.value.wrapper.offsetHeight
  }
}

defineExpose({
  dragging,
  resizing,
  titleId,
  bodyId,
  wrapper,
  header,
  footer,
  resizer,
  handleResize,
  handleConfirm,
  handleCancel,
  handleClose,
})

const slotParams = shallowReadonly(
  reactive({
    dragging,
    resizing,
    handleResize,
    handleConfirm,
    handleCancel,
    handleClose,
  }),
)

function setActive(active: boolean) {
  if (currentActive.value === active) return

  currentActive.value = active

  emit('update:active', active)
  emitEvent(props.onToggle, active)
}

function findPositionalParent() {
  if (!wrapper.value) return document.body

  let parentElement = wrapper.value.parentElement as HTMLElement

  while (parentElement && parentElement !== document.body) {
    if (getComputedStyle(parentElement).position !== 'static') {
      return parentElement
    }

    parentElement = parentElement.parentElement as HTMLElement
  }

  return parentElement
}

function computeTop() {
  if (!wrapper.value || props.top !== 'auto' || uselessTop.value) return

  const currentHeight = wrapper.value.offsetHeight

  if (props.inner) {
    rect.top = `${(findPositionalParent().offsetHeight - currentHeight) / 2}px`
  } else {
    rect.top = `${(window.innerHeight - currentHeight) / 2 - 20}px`
  }
}

function computeLeft() {
  if (!wrapper.value || props.left !== 'auto' || uselessLeft.value) return

  const currentWidth = wrapper.value.offsetWidth

  if (props.inner) {
    rect.left = `${(findPositionalParent().offsetWidth - currentWidth) / 2}px`
  } else {
    rect.left = `${(window.innerWidth - currentWidth) / 2}px`
  }
}

function transferRect(withSize = true) {
  if (!wrapper.value) return

  const { offsetWidth, offsetHeight, offsetTop, offsetLeft } = wrapper.value

  // If user is using top/bottom or right/left to specify size,
  // here need to force transfer to use offset size
  if (
    !withSize &&
    ((!uselessTop.value && props.bottom !== 'auto') ||
      (!uselessLeft.value && props.right !== 'auto'))
  ) {
    withSize = true
  }

  Object.assign(
    rect,
    {
      top: `${offsetTop}px`,
      right: 'auto',
      bottom: 'auto',
      left: `${offsetLeft}px`,
    },
    withSize
      ? {
          width: `${offsetWidth}px`,
          height: `${offsetHeight}px`,
        }
      : {},
  )
}

function handleConfirm() {
  handleClose(true)
  emitEvent(props.onConfirm)
}

function handleCancel() {
  handleClose(false)
  emitEvent(props.onCancel)
}

async function handleClose(isConfirm = false) {
  let result: unknown = true

  if (typeof props.onBeforeClose === 'function') {
    result = props.onBeforeClose(isConfirm)

    if (isPromise(result)) {
      result = await result
    }
  }

  if (result !== false) {
    await nextTick(() => {
      setActive(false)
      emitEvent(props.onClose)
    })
  }

  return result
}

function handleShow() {
  emitEvent(props.onShow)
}

function handleHide() {
  emitEvent(props.onHide)
}

function handleMaskClose() {
  if (props.maskClose) {
    return handleClose(false)
  }
}

function handleModalResize(entry: ResizeObserverEntry) {
  const box = entry.borderBoxSize?.[0]

  if (box) {
    modalRect.width = box.inlineSize
    modalRect.height = box.blockSize
  } else {
    modalRect.width = entry.contentRect.width
    modalRect.height = entry.contentRect.height
  }
}
</script>

<template>
  <Masker
    ref="masker"
    v-model:active="currentActive"
    :inherit="props.inherit"
    :class="className"
    :inner="props.inner"
    :transition-name="props.transitionName"
    :closable="props.maskClose"
    :disabled="props.hideMask"
    :on-before-close="handleMaskClose"
    :transfer="props.transfer"
    :auto-remove="props.autoRemove"
    :disable-esc="props.disableEsc"
    @show="handleShow"
    @hide="handleHide"
    @resize="handleResize"
  >
    <template #default="{ show }">
      <section v-show="show" :class="nh.be('transform')" :style="{ transformOrigin }">
        <ResizeObserver @resize="handleModalResize">
          <div
            ref="wrapper"
            :class="wrapperClass"
            role="dialog"
            :style="wrapperStyle"
            :aria-modal="show ? 'true' : undefined"
            :aria-labelledby="titleId"
            :aria-describedby="bodyId"
          >
            <div v-if="hasHeader" ref="header" :class="nh.be('header')">
              <slot name="header" v-bind="slotParams">
                <Renderer :renderer="props.slots.header" :data="slotParams">
                  <div :id="titleId" :class="nh.be('title')">
                    <slot name="title" v-bind="slotParams">
                      <Renderer :renderer="props.slots.title" :data="slotParams">
                        {{ props.title }}
                      </Renderer>
                    </slot>
                  </div>
                  <button
                    v-if="props.closable"
                    type="button"
                    :class="nh.be('close')"
                    @pointerdown.stop
                    @mousedown.stop
                    @touchstart.stop
                    @click="handleClose(false)"
                  >
                    <slot name="close" v-bind="slotParams">
                      <Renderer :renderer="props.slots.close" :data="slotParams">
                        <Icon
                          v-bind="icons.close"
                          :scale="+(icons.close.scale || 1) * 1.2"
                          label="close"
                        ></Icon>
                      </Renderer>
                    </slot>
                  </button>
                </Renderer>
              </slot>
            </div>
            <div
              :id="bodyId"
              :class="nh.be('content')"
              :style="{
                overflow: resizing ? 'hidden' : undefined
              }"
            >
              <slot v-bind="slotParams">
                <Renderer :renderer="props.slots.default" :data="slotParams"></Renderer>
              </slot>
            </div>
            <div v-if="!props.noFooter" ref="footer" :class="nh.be('footer')">
              <slot name="footer" v-bind="slotParams">
                <Renderer :renderer="props.slots.footer" :data="slotParams">
                  <Button
                    :class="[nh.be('button'), nh.bem('button', 'cancel')]"
                    inherit
                    text
                    :type="props.cancelType"
                    :size="props.actionSize"
                    v-bind="props.cancelProps"
                    @click="handleCancel"
                  >
                    {{ props.cancelText || locale.cancel }}
                  </Button>
                  <Button
                    :class="[nh.be('button'), nh.bem('button', 'confirm')]"
                    inherit
                    :type="props.confirmType"
                    :size="props.actionSize"
                    :loading="props.loading"
                    v-bind="props.confirmProps"
                    @click="handleConfirm"
                  >
                    {{ props.confirmText || locale.confirm }}
                  </Button>
                </Renderer>
              </slot>
            </div>
            <div v-if="props.resizable" ref="resizer" :class="nh.be('resizer')"></div>
          </div>
        </ResizeObserver>
      </section>
    </template>
  </Masker>
</template>
