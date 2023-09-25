<script setup lang="ts">
import { Button } from '@/components/button'
import { Icon } from '@/components/icon'
import { Modal } from '@/components/modal'
import { Renderer } from '@/components/renderer'

import { nextTick, onMounted, reactive, ref, toRef } from 'vue'

import { useIcons, useLocale, useNameHelper, useProps } from '@vexip-ui/config'
import { isFunction, isObject, isPromise } from '@vexip-ui/utils'
import { confirmProps } from './props'

import type { ConfirmButtonType, ConfirmOptions, ConfirmRenderFn, ConfirmState } from './symbol'

const positionValidator = (value: string | number) => {
  return value === 'auto' || !Number.isNaN(parseFloat(value as string))
}

const confirmButtonTypes = Object.freeze<ConfirmButtonType[]>([
  'default',
  'primary',
  'info',
  'success',
  'warning',
  'error'
])

const _props = defineProps(confirmProps)

const props = useProps('confirm', _props, {
  locale: null,
  top: {
    default: 'auto',
    validator: positionValidator
  },
  left: {
    default: 'auto',
    validator: positionValidator
  },
  width: {
    default: 420,
    validator: positionValidator
  },
  maskClose: false,
  confirmType: {
    default: 'primary',
    validator: value => confirmButtonTypes.includes(value)
  },
  cancelType: {
    default: 'default',
    validator: value => confirmButtonTypes.includes(value)
  },
  confirmText: null,
  cancelText: null,
  icon: null,
  className: null,
  style: null,
  renderer: {
    default: null,
    isFunc: true,
    static: true
  },
  iconProps: () => ({}),
  closable: false,
  parseHtml: false,
  contentAlign: 'left',
  actionsAlign: 'right'
})

const nh = useNameHelper('confirm')
const icons = useIcons()
const locale = useLocale('confirm', toRef(props, 'locale'))

const state = reactive<ConfirmState>({
  visible: false,
  loading: false,
  title: '',
  content: '',
  icon: props.icon,
  iconProps: props.iconProps,
  className: props.className,
  style: props.style || {},
  confirmType: props.confirmType,
  cancelType: props.cancelType,
  confirmText: props.confirmText,
  cancelText: props.cancelText,
  maskClose: props.maskClose,
  parseHtml: props.parseHtml,
  closable: props.closable,
  contentAlign: props.contentAlign,
  actionsAlign: props.actionsAlign,
  raw: {}
})

const rendererR = ref<ConfirmRenderFn | null>(props.renderer)

let beforeConfirmR: (() => unknown) | null = null

let onConfirm: (() => void) | null = null
let onCancel: (() => void) | null = null

const mounted = new Promise<void>(resolve => {
  onMounted(() => {
    nextTick(resolve)
  })
})

defineExpose({ openConfirm, handleReset })

async function openConfirm(options: ConfirmOptions) {
  await mounted

  return await new Promise<boolean>(resolve => {
    state.title = options.title ?? ''
    state.content = options.content ?? ''
    state.className = options.className ?? props.className
    state.style = options.style ?? props.style
    state.icon = options.icon ?? props.icon
    state.iconProps = options.iconProps ?? props.iconProps
    state.maskClose = options.maskClose ?? props.maskClose
    state.confirmType = options.confirmType ?? props.confirmType
    state.cancelType = options.cancelType ?? props.cancelType
    state.confirmText = options.confirmText ?? props.confirmText
    state.cancelText = options.cancelText ?? props.cancelText
    state.parseHtml = options.parseHtml ?? props.parseHtml
    state.closable = options.closable ?? props.closable
    state.contentAlign = options.contentAlign ?? props.contentAlign
    state.actionsAlign = options.actionsAlign ?? props.actionsAlign
    state.raw = options

    rendererR.value = isFunction(options.renderer) ? options.renderer : props.renderer
    beforeConfirmR = isFunction(options.onBeforeConfirm) ? options.onBeforeConfirm : null

    if (isFunction(rendererR.value)) {
      const render = rendererR.value

      rendererR.value = () => render(state, handleConfirm, handleCancel)
    }

    state.visible = true
    onConfirm = () => {
      resolve(true)
      beforeConfirmR = null
    }
    onCancel = () => {
      resolve(false)
      beforeConfirmR = null
    }
  })
}

async function handleConfirm() {
  state.loading = true

  if (isFunction(beforeConfirmR)) {
    let result = beforeConfirmR()

    if (isPromise(result)) {
      result = await result
    }

    if (result === false) {
      state.loading = false

      return
    }
  }

  state.visible = false
  state.loading = false

  if (isFunction(onConfirm)) {
    onConfirm()
    onConfirm = null
  }
}

function handleCancel() {
  state.visible = false

  if (isFunction(onCancel)) {
    onCancel()
    onCancel = null
  }
}

function handleReset() {
  state.visible = false
  state.title = ''
  state.content = ''
  state.icon = props.icon
  state.iconProps = props.iconProps
  state.className = props.className
  state.style = props.style
  state.maskClose = props.maskClose
  state.confirmType = props.confirmType
  state.cancelType = props.cancelType
  state.confirmText = props.confirmText
  state.cancelText = props.cancelText
  state.parseHtml = props.parseHtml
  state.closable = props.closable
  state.contentAlign = props.contentAlign
  state.actionsAlign = props.actionsAlign
  state.raw = {}

  rendererR.value = props.renderer
}
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <Modal
    no-footer
    :closable="false"
    :auto-remove="false"
    :active="state.visible"
    :class="[nh.b(), nh.bs('vars')]"
    :modal-class="state.className"
    :modal-style="state.style"
    :top="props.top"
    :left="props.left"
    :width="props.width"
    :mask-close="state.maskClose"
    @hide="handleReset"
  >
    <Renderer v-if="isFunction(rendererR)" :renderer="rendererR"></Renderer>
    <template v-else>
      <div v-if="state.title" :class="nh.be('header')">
        <div :class="nh.be('title')">
          {{ state.title }}
        </div>
        <button
          v-if="state.closable"
          type="button"
          :class="nh.be('close')"
          @mousedown.stop
          @click="handleCancel"
        >
          <slot name="close">
            <Icon v-bind="icons.close" :scale="(icons.close.scale || 1) * 1.2" label="close"></Icon>
          </slot>
        </button>
      </div>
      <div
        :class="[
          nh.be('body'),
          nh.bem('body', state.contentAlign),
          !state.title && nh.bem('body', 'no-title')
        ]"
      >
        <div v-if="state.icon !== false" :class="nh.be('icon')">
          <Renderer v-if="isFunction(state.icon)" :renderer="state.icon"></Renderer>
          <Icon v-else-if="isObject(state.icon)" v-bind="state.iconProps" :icon="state.icon"></Icon>
          <Icon
            v-else
            :scale="2.2"
            v-bind="{ ...icons.question, ...state.iconProps }"
            :icon="icons.question.icon"
          ></Icon>
        </div>
        <div v-if="state.parseHtml" :class="nh.be('content')" v-html="state.content"></div>
        <div v-else :class="nh.be('content')">
          {{ state.content }}
        </div>
      </div>
      <div :class="[nh.be('footer'), nh.bem('footer', state.actionsAlign)]">
        <Button
          :class="nh.be('button')"
          inherit
          no-pulse
          :type="state.cancelType"
          @click="handleCancel"
        >
          {{ state.cancelText || locale.cancel }}
        </Button>
        <Button
          :class="nh.be('button')"
          inherit
          no-pulse
          :type="state.confirmType"
          :loading="state.loading"
          @click="handleConfirm"
        >
          {{ state.confirmText || locale.confirm }}
        </Button>
      </div>
    </template>
  </Modal>
</template>
