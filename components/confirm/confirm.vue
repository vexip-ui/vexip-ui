<template>
  <!-- eslint-disable vue/no-v-html -->
  <Modal
    no-footer
    :closable="false"
    :auto-remove="false"
    :active="visible"
    :class="[nh.b(), nh.bs('vars')]"
    :modal-class="classR"
    :modal-style="styleR"
    :top="props.top"
    :left="props.left"
    :width="props.width"
    :mask-close="maskCloseR"
    @hide="handleReset"
  >
    <Renderer v-if="isFunction(rendererR)" :renderer="rendererR"></Renderer>
    <template v-else>
      <div v-if="title" :class="nh.be('header')">
        <div :class="nh.be('title')">
          {{ title }}
        </div>
        <button
          v-if="closableR"
          type="button"
          :class="nh.be('close')"
          @mousedown.stop
          @click="handleCancel"
        >
          <slot name="close">
            <Icon v-bind="icons.close" :scale="1.2" label="close"></Icon>
          </slot>
        </button>
      </div>
      <div
        :class="[
          nh.be('body'),
          nh.bem('body', contentAlignR),
          !title && nh.bem('body', 'no-title')
        ]"
      >
        <div v-if="iconR !== false" :class="nh.be('icon')">
          <Renderer v-if="isFunction(iconR)" :renderer="iconR"></Renderer>
          <Icon v-else-if="isObject(iconR)" v-bind="iconPropsR" :icon="iconR"></Icon>
          <Icon
            v-else
            :scale="2.2"
            v-bind="{ ...icons.question, ...iconPropsR }"
            :icon="icons.question.icon"
          ></Icon>
        </div>
        <div v-if="parseHtmlR" :class="nh.be('content')" v-html="content"></div>
        <div v-else :class="nh.be('content')">
          {{ content }}
        </div>
      </div>
      <div :class="[nh.be('footer'), nh.bem('footer', actionsAlignR)]">
        <Button
          :class="nh.be('button')"
          inherit
          no-pulse
          :type="cancelTypeR"
          @click="handleCancel"
        >
          {{ cancelTextR || locale.cancel }}
        </Button>
        <Button
          :class="nh.be('button')"
          inherit
          no-pulse
          :type="confirmTypeR"
          :loading="loading"
          @click="handleConfirm"
        >
          {{ confirmTextR || locale.confirm }}
        </Button>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import { Button } from '@/components/button'
import { Icon } from '@/components/icon'
import { Modal } from '@/components/modal'
import { Renderer } from '@/components/renderer'

import { defineComponent, nextTick, onMounted, ref, toRef } from 'vue'

import { useIcons, useLocale, useNameHelper, useProps } from '@vexip-ui/config'
import { isFunction, isObject, isPromise } from '@vexip-ui/utils'
import { confirmProps } from './props'

import type { ConfirmButtonType, ConfirmOptions, ConfirmRenderFn } from './symbol'

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

export default defineComponent({
  name: 'Confirm',
  components: {
    Button,
    Icon,
    Modal,
    Renderer
  },
  props: confirmProps,
  setup(_props) {
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

    const visible = ref(false)
    const loading = ref(false)
    const title = ref('')
    const content = ref('')
    const iconPropsR = ref(props.iconProps)
    const classR = ref(props.className)
    const styleR = ref(props.style || ({} as any))
    const confirmTypeR = ref(props.confirmType)
    const cancelTypeR = ref(props.cancelType)
    const confirmTextR = ref(props.confirmText)
    const cancelTextR = ref(props.cancelText)
    const maskCloseR = ref(props.maskClose)
    const parseHtmlR = ref(props.parseHtml)
    const closableR = ref(props.closable)
    const contentAlignR = ref(props.contentAlign)
    const actionsAlignR = ref(props.actionsAlign)
    const iconR = ref(props.icon)
    const rendererR = ref<ConfirmRenderFn | null>(props.renderer)
    const onBeforeConfirm = ref<(() => unknown) | null>(null)

    const onConfirm = ref<(() => void) | null>(null)
    const onCancel = ref<(() => void) | null>(null)

    const mounted = new Promise<void>(resolve => {
      onMounted(() => {
        nextTick(resolve)
      })
    })

    async function openConfirm(options: ConfirmOptions) {
      await mounted

      return await new Promise<boolean>(resolve => {
        title.value = options.title ?? ''
        content.value = options.content ?? ''
        classR.value = options.className ?? props.className
        styleR.value = options.style ?? props.style
        iconPropsR.value = options.iconProps ?? props.iconProps
        maskCloseR.value = options.maskClose ?? props.maskClose
        confirmTypeR.value = options.confirmType ?? props.confirmType
        cancelTypeR.value = options.cancelType ?? props.cancelType
        confirmTextR.value = options.confirmText ?? props.confirmText
        cancelTextR.value = options.cancelText ?? props.cancelText
        parseHtmlR.value = options.parseHtml ?? props.parseHtml
        closableR.value = options.closable ?? props.closable
        contentAlignR.value = options.contentAlign ?? props.contentAlign
        actionsAlignR.value = options.actionsAlign ?? props.actionsAlign
        iconR.value = options.icon ?? props.icon
        rendererR.value = isFunction(options.renderer) ? options.renderer : props.renderer
        onBeforeConfirm.value = isFunction(options.onBeforeConfirm) ? options.onBeforeConfirm : null

        if (isFunction(rendererR.value)) {
          rendererR.value = () => rendererR.value!(options, handleConfirm, handleCancel)
        }

        visible.value = true

        onConfirm.value = () => {
          resolve(true)
          onBeforeConfirm.value = null
        }
        onCancel.value = () => {
          resolve(false)
          onBeforeConfirm.value = null
        }
      })
    }

    async function handleConfirm() {
      loading.value = true

      if (isFunction(onBeforeConfirm.value)) {
        let result = onBeforeConfirm.value()

        if (isPromise(result)) {
          result = await result
        }

        if (result === false) {
          loading.value = false

          return
        }
      }

      visible.value = false
      loading.value = false

      if (isFunction(onConfirm.value)) {
        onConfirm.value()
        onConfirm.value = null
      }
    }

    function handleCancel() {
      visible.value = false

      if (isFunction(onCancel.value)) {
        onCancel.value()
        onCancel.value = null
      }
    }

    function handleReset() {
      visible.value = false
      title.value = ''
      content.value = ''
      iconPropsR.value = props.iconProps
      classR.value = props.className
      styleR.value = props.style
      maskCloseR.value = props.maskClose
      confirmTypeR.value = props.confirmType
      cancelTypeR.value = props.cancelType
      confirmTextR.value = props.confirmText
      cancelTextR.value = props.cancelText
      parseHtmlR.value = props.parseHtml
      closableR.value = props.closable
      contentAlignR.value = props.contentAlign
      actionsAlignR.value = props.actionsAlign
      iconR.value = props.icon
      rendererR.value = props.renderer
    }

    return {
      props,
      nh: useNameHelper('confirm'),
      icons: useIcons(),
      locale: useLocale('confirm', toRef(props, 'locale')),
      visible,
      loading,
      title,
      content,

      classR,
      styleR,
      iconPropsR,
      maskCloseR,
      confirmTypeR,
      cancelTypeR,
      confirmTextR,
      cancelTextR,
      parseHtmlR,
      closableR,
      contentAlignR,
      actionsAlignR,
      iconR,
      rendererR,

      isFunction,
      isObject,
      openConfirm,
      handleConfirm,
      handleCancel,
      handleReset
    }
  }
})
</script>
