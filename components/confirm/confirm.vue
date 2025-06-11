<script setup lang="ts">
import { Button } from '@/components/button'
import { Icon } from '@/components/icon'
import { Modal } from '@/components/modal'
import { Renderer } from '@/components/renderer'

import { nextTick, onMounted, reactive, ref, toRef } from 'vue'

import { useIcons, useLocale, useNameHelper, useProps } from '@vexip-ui/config'
import { isFunction, isPromise } from '@vexip-ui/utils'
import { confirmProps } from './props'

import type { ConfirmButtonType, ConfirmOptions, ConfirmRenderFn, ConfirmState } from './symbol'

const positionValidator = (value: string | number) => {
  return value === 'auto' || !Number.isNaN(parseFloat(value as string))
}
const positionProp = {
  default: 'auto',
  validator: positionValidator,
}

const confirmButtonTypes = Object.freeze<ConfirmButtonType[]>([
  'default',
  'primary',
  'info',
  'success',
  'warning',
  'error',
])

defineOptions({ name: 'Confirm' })

const _props = defineProps(confirmProps)
const props = useProps('confirm', _props, {
  locale: null,
  width: {
    default: 420,
    validator: positionValidator,
  },
  height: positionProp,
  top: positionProp,
  left: positionProp,
  right: positionProp,
  bottom: positionProp,
  maskClose: false,
  confirmType: {
    default: 'primary',
    validator: value => confirmButtonTypes.includes(value),
  },
  cancelType: {
    default: 'default',
    validator: value => confirmButtonTypes.includes(value),
  },
  confirmText: null,
  cancelText: null,
  icon: {
    isFunc: true,
    default: false,
  },
  className: null,
  style: null,
  renderer: {
    default: null,
    isFunc: true,
    static: true,
  },
  iconProps: () => ({}),
  closable: false,
  parseHtml: false,
  contentAlign: 'left',
  actionsAlign: 'right',
  cancelable: true,
  xOffset: 0,
  yOffset: 0,
})

const nh = useNameHelper('confirm')
const icons = useIcons()
const locale = useLocale('confirm', toRef(props, 'locale'))

const commonProps = [
  'className',
  'style',
  'icon',
  'iconProps',
  'maskClose',
  'confirmType',
  'cancelType',
  'confirmText',
  'cancelText',
  'parseHtml',
  'closable',
  'contentAlign',
  'actionsAlign',
  'cancelable',
  'width',
  'height',
  'top',
  'right',
  'bottom',
  'left',
  'xOffset',
  'yOffset',
] as const

const state = reactive<ConfirmState>({
  ...commonProps.reduce((prev, current) => ((prev[current] = props[current]), prev), {} as any),
  visible: false,
  loading: false,
  title: '',
  content: '',
  raw: {},
})

const rendererR = ref<ConfirmRenderFn | null>(props.renderer)

let beforeConfirmR: (() => unknown) | null = null

let onConfirm: (() => void) | null = null
let onCancel: (() => void) | null = null

const mountedPromise = new Promise<void>(resolve => {
  onMounted(() => {
    nextTick(resolve)
  })
})

defineExpose({ state, openConfirm, handleReset })

async function openConfirm(options: ConfirmOptions) {
  await mountedPromise

  return await new Promise<boolean>(resolve => {
    for (const prop of commonProps) {
      ;(state as any)[prop] = options[prop] ?? props[prop]
    }

    state.title = options.title ?? ''
    state.content = options.content ?? ''

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
  for (const prop of commonProps) {
    ;(state as any)[prop] = props[prop]
  }

  state.visible = false
  state.loading = false
  state.title = ''
  state.content = ''

  state.raw = {}

  rendererR.value = props.renderer
}
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <div :class="[nh.b(), nh.bs('vars')]">
    <Modal
      no-footer
      :auto-remove="false"
      :transfer="false"
      :closable="false"
      :active="state.visible"
      :modal-class="state.className"
      :modal-style="state.style"
      :width="state.width"
      :height="state.height"
      :top="state.top"
      :left="state.left"
      :right="state.right"
      :bottom="state.bottom"
      :x-offset="state.xOffset"
      :y-offset="state.yOffset"
      :mask-close="state.maskClose"
      @hide="handleReset"
    >
      <Renderer v-if="isFunction(rendererR)" :renderer="rendererR"></Renderer>
      <template v-else>
        <div v-if="state.title" :class="nh.be('header')">
          <div :class="nh.be('title')">
            <Renderer v-if="typeof state.title === 'function'" :renderer="state.title"></Renderer>
            <template v-else>
              {{ state.title }}
            </template>
          </div>
          <button
            v-if="state.closable"
            type="button"
            :class="nh.be('close')"
            @mousedown.stop
            @click="handleCancel"
          >
            <slot name="close">
              <Icon
                v-bind="icons.close"
                :scale="+(icons.close.scale || 1) * 1.2"
                label="close"
              ></Icon>
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
            <Icon
              v-if="typeof state.icon !== 'boolean'"
              v-bind="state.iconProps"
              :icon="state.icon"
            ></Icon>
            <Icon
              v-else
              :scale="2.2"
              v-bind="{
                ...(state.cancelable ? icons.question : icons.warning),
                ...state.iconProps
              }"
              :icon="(state.cancelable ? icons.question : icons.warning).icon"
            ></Icon>
          </div>
          <Renderer v-if="typeof state.content === 'function'" :renderer="state.content"></Renderer>
          <template v-else>
            <div v-if="state.parseHtml" :class="nh.be('content')" v-html="state.content"></div>
            <div v-else :class="nh.be('content')">
              {{ state.content }}
            </div>
          </template>
        </div>
        <div :class="[nh.be('footer'), nh.bem('footer', state.actionsAlign)]">
          <Button
            v-if="state.cancelable"
            :class="[nh.be('button'), nh.bem('button', 'cancel')]"
            inherit
            no-pulse
            :type="state.cancelType"
            @click="handleCancel"
          >
            {{ state.cancelText || locale.cancel }}
          </Button>
          <Button
            :class="[nh.be('button'), nh.bem('button', 'confirm')]"
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
  </div>
</template>
