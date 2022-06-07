<template>
  <!-- eslint-disable vue/no-v-html -->
  <Modal
    no-footer
    :closable="false"
    :active="visible"
    :class="[prefix, `${prefix}-vars`]"
    :top="props.top"
    :left="props.left"
    :width="props.width"
    :mask-close="maskCloseR"
    @hide="handleReset"
  >
    <div :class="`${prefix}__body`" :style="styleR">
      <Renderer v-if="isFunction(rendererR)" :renderer="rendererR"></Renderer>
      <template v-else>
        <div :class="`${prefix}__icon`">
          <Renderer v-if="isFunction(icon)" :renderer="icon"></Renderer>
          <Icon
            v-else
            :icon="iconR || CircleQuestion"
            :scale="2.2"
            :style="{ color: iconColorR }"
          ></Icon>
        </div>
        <div :class="`${prefix}__content`">
          {{ content }}
        </div>
      </template>
    </div>
    <div :class="`${prefix}__actions`">
      <Button :class="`${prefix}__button`" @click="handleCancel">
        {{ cancelTextR || locale.cancel }}
      </Button>
      <Button
        :class="`${prefix}__button`"
        :type="confirmTypeR"
        :loading="loading"
        @click="handleConfirm"
      >
        {{ confirmTextR || locale.confirm }}
      </Button>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Button } from '@/components/button'
import { Icon } from '@/components/icon'
import { Modal } from '@/components/modal'
import { Renderer } from '@/components/renderer'
import { useProps, useLocale, booleanProp } from '@vexip-ui/config'
import { isPromise, isFunction } from '@vexip-ui/utils'
import { CircleQuestion } from '@vexip-ui/icons'

import type { PropType, CSSProperties } from 'vue'
import type { ConfirmType, ConfirmOptions } from './symbol'

const positionType = [Number, String]
const positionValidator = (value: string | number) => {
  return value === 'auto' || !Number.isNaN(parseFloat(value as string))
}

const confirmTypes = Object.freeze<ConfirmType>(['default', 'primary', 'info', 'success', 'warning', 'error'])

export default defineComponent({
  name: 'Confirm',
  components: {
    Button,
    Icon,
    Modal,
    Renderer
  },
  props: {
    top: positionType,
    left: positionType,
    width: positionType,
    maskClose: booleanProp,
    confirmType: String as PropType<ConfirmType>,
    confirmText: String,
    cancelText: String,
    icon: [Object, Function] as PropType<Record<string, any> | (() => any)>,
    style: Object,
    renderer: Function as PropType<() => any>,
    iconColor: String
  },
  emits: ['confirm', 'cancel'],
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
        default: 'default' as ConfirmType,
        validator: (value: ConfirmType) => confirmTypes.includes(value)
      },
      confirmText: null,
      cancelText: null,
      icon: null,
      style: null,
      renderer: {
        default: null,
        isFunc: true
      },
      iconColor: ''
    })

    const visible = ref(false)
    const loading = ref(false)
    const content = ref('')
    const iconColorR = ref(props.iconColor)
    const styleR = ref<CSSProperties>(props.style || {})
    const confirmTypeR = ref(props.confirmType)
    const confirmTextR = ref(props.confirmText)
    const cancelTextR = ref(props.cancelText)
    const maskCloseR = ref(props.maskClose)
    const iconR = ref(props.icon)
    const rendererR = ref<(() => any) | null>(props.renderer)
    const onBeforeConfirm = ref<(() => unknown) | null>(null)

    const onConfirm = ref<(() => void) | null>(null)
    const onCancel = ref<(() => void) | null>(null)

    function openConfirm(options: ConfirmOptions) {
      return new Promise<boolean>(resolve => {
        content.value = options.content ?? ''
        styleR.value = options.style ?? props.style
        iconColorR.value = options.iconColor ?? props.iconColor
        maskCloseR.value = options.maskClose ?? props.maskClose
        confirmTypeR.value = options.confirmType ?? props.confirmType
        confirmTextR.value = options.confirmText ?? props.confirmText
        cancelTextR.value = options.cancelText ?? props.cancelText
        iconR.value = options.icon ?? props.icon
        rendererR.value = isFunction(options.renderer) ? options.renderer : props.renderer
        onBeforeConfirm.value = isFunction(options.onBeforeConfirm) ? options.onBeforeConfirm : null

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
      content.value = ''
      iconColorR.value = props.iconColor
      styleR.value = props.style
      maskCloseR.value = props.maskClose
      confirmTypeR.value = props.confirmType
      confirmTextR.value = props.confirmText
      cancelTextR.value = props.cancelText
      iconR.value = props.icon
      rendererR.value = props.renderer
    }

    return {
      CircleQuestion,

      props,
      prefix: 'vxp-confirm',
      locale: useLocale('confirm'),
      visible,
      loading,
      content,

      styleR,
      iconColorR,
      maskCloseR,
      confirmTypeR,
      confirmTextR,
      cancelTextR,
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
