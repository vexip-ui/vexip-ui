<script setup lang="ts">
import { Button } from '@/components/button'
import { Icon } from '@/components/icon'
import { Masker } from '@/components/masker'

import { computed, nextTick, onMounted, reactive, ref, shallowReadonly, toRef, watch } from 'vue'

import {
  createSizeProp,
  emitEvent,
  useIcons,
  useLocale,
  useNameHelper,
  useProps
} from '@vexip-ui/config'
import { useMoving } from '@vexip-ui/hooks'
import { getGlobalCount, isPromise, toNumber } from '@vexip-ui/utils'
import { drawerProps } from './props'
import { drawerPlacements } from './symbol'

import type { DrawerCommonSLot } from './symbol'

defineOptions({ name: 'Drawer' })

const _props = defineProps(drawerProps)
const props = useProps('drawer', _props, {
  locale: null,
  transfer: false,
  active: {
    default: false,
    static: true
  },
  width: {
    default: 280,
    validator: value => typeof value === 'string' || value > 0
  },
  height: {
    default: 280,
    validator: value => typeof value === 'string' || value > 0
  },
  placement: {
    default: 'right',
    validator: value => drawerPlacements.includes(value)
  },
  title: '',
  closable: true,
  inner: false,
  maskClose: true,
  drawerClass: null,
  hideMask: false,
  onBeforeClose: {
    default: null,
    isFunc: true
  },
  resizable: false,
  autoRemove: false,
  footer: false,
  confirmText: null,
  cancelText: null,
  loading: false,
  confirmType: 'primary',
  cancelType: 'default',
  actionSize: createSizeProp('small'),
  undivided: false,
  disableEsc: false
})

const emit = defineEmits(['update:active'])

const slots = defineSlots<{
  header: DrawerCommonSLot,
  title: DrawerCommonSLot,
  close: DrawerCommonSLot,
  default: DrawerCommonSLot,
  footer: DrawerCommonSLot,
  handler: DrawerCommonSLot
}>()

const nh = useNameHelper('drawer')
const icons = useIcons()
const locale = useLocale('drawer', toRef(props, 'locale'))

const currentActive = ref(props.active)
const currentWidth = ref(props.width)
const currentHeight = ref(props.height)

const wrapper = ref<HTMLElement>()

const idIndex = `${getGlobalCount()}`
const rendered = ref(false)

const { target: resizer, moving: resizing } = useMoving({
  onStart: (state, event) => {
    if (!props.resizable || event.button > 0 || !wrapper.value) {
      return false
    }

    const width = `${currentWidth.value}`.endsWith('%')
      ? wrapper.value.offsetWidth
      : toNumber(currentWidth.value)
    const height = `${currentHeight.value}`.endsWith('%')
      ? wrapper.value.offsetHeight
      : toNumber(currentHeight.value)

    state.xStart = width
    state.yStart = height

    emitEvent(props.onResizeStart, { width, height })
  },
  onMove: (state, event) => {
    const deltaX = event.clientX - state.clientX
    const deltaY = event.clientY - state.clientY

    let width = toNumber(currentWidth.value)
    let height = toNumber(currentHeight.value)

    switch (props.placement) {
      case 'top': {
        height = state.yStart + deltaY
        break
      }
      case 'right': {
        width = state.xStart - deltaX
        break
      }
      case 'bottom': {
        height = state.yStart - deltaY
        break
      }
      default: {
        width = state.xStart + deltaX
      }
    }

    currentWidth.value = Math.max(width, 100)
    currentHeight.value = Math.max(height, 100)

    emitEvent(props.onResizeMove, {
      width: toNumber(currentWidth.value),
      height: toNumber(currentHeight.value)
    })
  },
  onEnd: () => {
    emitEvent(props.onResizeEnd, {
      width: toNumber(currentWidth.value),
      height: toNumber(currentHeight.value)
    })
  }
})

const className = computed(() => {
  return [
    nh.b(),
    nh.bs('vars'),
    {
      [nh.bm('inherit')]: props.inherit,
      [nh.bm('inner')]: props.inner,
      [nh.bm('closable')]: props.closable,
      [nh.bm('resizable')]: props.resizable,
      [nh.bm('undivided')]: props.undivided
    }
  ]
})
const moveTransition = computed(() => {
  return nh.ns(`move-${props.placement}`)
})
const wrapperClass = computed(() => {
  return [
    nh.be('wrapper'),
    nh.bem('wrapper', props.placement),
    {
      [nh.bem('wrapper', 'hide-mask')]: props.hideMask,
      [nh.bem('wrapper', 'resizing')]: resizing.value
    },
    props.drawerClass
  ]
})
const wrapperStyle = computed(() => {
  const placement = props.placement

  if (placement === 'top' || placement === 'bottom') {
    const height = currentHeight.value

    return {
      height: `${height}`.endsWith('%') ? height : `${height}px`
    }
  }

  const width = currentWidth.value

  return {
    width: `${width}`.endsWith('%') ? width : `${width}px`
  }
})
const hasTitle = computed(() => {
  return !!(slots.header || slots.title || props.title)
})
const titleId = computed(() => `${nh.bs(idIndex)}__title`)
const bodyId = computed(() => `${nh.bs(idIndex)}__body`)

watch(
  () => props.active,
  value => {
    console.log(value, 'value')
    if (value) {
      rendered.value = true
    }
    currentActive.value = value
  }
)
watch(
  () => props.width,
  value => {
    currentWidth.value = value
  }
)
watch(
  () => props.height,
  value => {
    currentHeight.value = value
  }
)
onMounted(() => {
  if (props.active) {
    rendered.value = true
  }
})

defineExpose({
  resizing,
  titleId,
  bodyId,
  wrapper,
  resizer,
  handleConfirm,
  handleCancel,
  handleClose
})

const slotParams = shallowReadonly(
  reactive({
    resizing,
    handleConfirm,
    handleCancel,
    handleClose
  })
)

function setActive(active: boolean) {
  if (currentActive.value === active) return

  currentActive.value = active

  emit('update:active', active)
  emitEvent(props.onToggle, active)
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
    nextTick(() => {
      setActive(false)
      emitEvent(props.onClose)
    })
  }

  return result
}

function handleMaskClose() {
  if (props.maskClose) {
    return handleClose()
  }
}

function handleShow() {
  emitEvent(props.onShow)
}

function handleHide() {
  emitEvent(props.onHide)
}

function handleConfirm() {
  handleClose(true)
  emitEvent(props.onConfirm)
}

function handleCancel() {
  handleClose(false)
  emitEvent(props.onCancel)
}
</script>

<template>
  <Masker
    v-model:active="currentActive"
    :inherit="props.inherit"
    :class="className"
    :inner="props.inner"
    :transition-name="moveTransition"
    :closable="props.maskClose"
    :disabled="props.hideMask"
    :on-before-close="handleMaskClose"
    :transfer="props.transfer"
    :auto-remove="props.autoRemove"
    :disable-esc="props.disableEsc"
    @show="handleShow"
    @hide="handleHide"
  >
    <template #default="{ show }">
      <section
        v-show="show"
        ref="wrapper"
        :class="wrapperClass"
        :style="wrapperStyle"
        role="dialog"
        :aria-modal="show ? 'true' : undefined"
        :aria-labelledby="titleId"
        :aria-describedby="bodyId"
      >
        <div v-if="hasTitle" :class="nh.be('header')">
          <slot name="header" v-bind="slotParams">
            <div :id="titleId" :class="nh.be('title')">
              <slot name="title" v-bind="slotParams">
                {{ props.title }}
              </slot>
            </div>
            <button
              v-if="props.closable"
              type="button"
              :class="nh.be('close')"
              @click="handleClose()"
            >
              <slot name="close" v-bind="slotParams">
                <Icon
                  v-bind="icons.close"
                  :scale="+(icons.close.scale || 1) * 1.2"
                  label="close"
                ></Icon>
              </slot>
            </button>
          </slot>
        </div>
        <div v-if="rendered" :id="bodyId" :class="nh.be('content')">
          <slot v-bind="slotParams"></slot>
        </div>
        <div v-if="props.footer || $slots.footer" :class="nh.be('footer')">
          <slot name="footer" v-bind="slotParams">
            <Button
              :class="[nh.be('button'), nh.bem('button', 'cancel')]"
              inherit
              text
              :type="props.cancelType"
              :size="props.actionSize"
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
              @click="handleConfirm"
            >
              {{ props.confirmText || locale.confirm }}
            </Button>
          </slot>
        </div>
        <div
          v-if="props.resizable"
          ref="resizer"
          :class="[
            nh.be('handler'),
            nh.bem('handler', props.placement),
            {
              [nh.bem('handler', 'resizing')]: resizing
            }
          ]"
        >
          <slot name="handler" v-bind="slotParams"></slot>
        </div>
      </section>
    </template>
  </Masker>
</template>
