<template>
  <!-- eslint-disable vue/no-v-html -->
  <Modal
    no-footer
    :closable="false"
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
          :class="nh.be('close')"
          @mousedown.stop
          @click="handleCancel"
        >
          <slot name="close">
            <Icon :scale="1.2" label="close">
              <Xmark></Xmark>
            </Icon>
          </slot>
        </button>
      </div>
      <div
        :class="[
          nh.be('body'),
          nh.bem('body', contentAlignR),
          title && nh.bem('body', 'with-title')
        ]"
      >
        <div :class="nh.be('icon')">
          <Renderer v-if="isFunction(icon)" :renderer="icon"></Renderer>
          <Icon
            v-else
            :icon="iconR || CircleQuestion"
            :scale="2.2"
            :style="{ color: iconColorR }"
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
      <button
        v-if="closableR && !title"
        :class="nh.be('close')"
        @mousedown.stop
        @click="handleCancel"
      >
        <slot name="close">
          <Icon :scale="1.2" label="close">
            <Xmark></Xmark>
          </Icon>
        </slot>
      </button>
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick } from 'vue'
import { Button } from '@/components/button'
import { Icon } from '@/components/icon'
import { Modal } from '@/components/modal'
import { Renderer } from '@/components/renderer'
import { useNameHelper, useProps, useLocale } from '@vexip-ui/config'
import { isPromise, isFunction } from '@vexip-ui/utils'
import { Xmark, CircleQuestion } from '@vexip-ui/icons'
import { confirmProps } from './props'

import type { ConfirmType, ConfirmRenderFn, ConfirmOptions } from './symbol'

const positionValidator = (value: string | number) => {
  return value === 'auto' || !Number.isNaN(parseFloat(value as string))
}

const confirmTypes = Object.freeze<ConfirmType>([
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
        default: 'default',
        validator: value => confirmTypes.includes(value)
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
      iconColor: '',
      closable: false,
      parseHtml: false,
      contentAlign: 'center',
      actionsAlign: 'center'
    })

    const visible = ref(false)
    const loading = ref(false)
    const title = ref('')
    const content = ref('')
    const iconColorR = ref(props.iconColor)
    const classR = ref(props.className)
    const styleR = ref(props.style || ({} as any))
    const confirmTypeR = ref(props.confirmType)
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
        iconColorR.value = options.iconColor ?? props.iconColor
        maskCloseR.value = options.maskClose ?? props.maskClose
        confirmTypeR.value = options.confirmType ?? props.confirmType
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
      iconColorR.value = props.iconColor
      classR.value = props.className
      styleR.value = props.style
      maskCloseR.value = props.maskClose
      confirmTypeR.value = props.confirmType
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
      CircleQuestion,

      props,
      nh: useNameHelper('confirm'),
      locale: useLocale('confirm'),
      visible,
      loading,
      title,
      content,

      classR,
      styleR,
      iconColorR,
      maskCloseR,
      confirmTypeR,
      confirmTextR,
      cancelTextR,
      parseHtmlR,
      closableR,
      contentAlignR,
      actionsAlignR,
      iconR,
      rendererR,

      isFunction,
      openConfirm,
      handleConfirm,
      handleCancel,
      handleReset
    }
  }
})
</script>
