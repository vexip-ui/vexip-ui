<template>
  <!-- eslint-disable vue/no-v-html -->
  <Modal
    no-footer
    :closable="false"
    :active="visible"
    :class="prefix"
    :top="top"
    :left="left"
    :width="width"
    :mask-close="maskClose"
    @on-hide="handleReset"
  >
    <div :class="`${prefix}__body`" :style="style">
      <Renderer v-if="isFunction(renderer)" :renderer="renderer"></Renderer>
      <template v-else>
        <div :class="`${prefix}__icon`">
          <Renderer v-if="isFunction(icon)" :renderer="icon"></Renderer>
          <Icon
            v-else-if="icon && typeof icon === 'object'"
            v-bind="icon"
            :style="[{ color: iconColor }, icon.style]"
          ></Icon>
          <Icon
            v-else
            :name="icon || 'question-circle'"
            :scale="2.2"
            :style="{ color: iconColor }"
          ></Icon>
        </div>
        <div :class="`${prefix}__content`">
          {{ content }}
        </div>
      </template>
    </div>
    <div :class="`${prefix}__actions`">
      <Button :class="`${prefix}__button`" @on-click="handleCancel">
        {{ cancelText }}
      </Button>
      <Button
        :class="`${prefix}__button`"
        :type="confirmType"
        :loading="loading"
        @on-click="handleConfirm"
      >
        {{ confirmText }}
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
import { useConfiguredProps } from '@/common/config/install'
import { isPromise, isFunction } from '@/common/utils/common'

import '@/common/icons/question-circle'

import type { PropType, VNodeChild, CSSProperties } from 'vue'
import type { ConfirmType, ConfirmOptions } from './symbol'

const positionType = [Number, String]
const positionValidator = (value: string | number) => {
  return value === 'auto' || !Number.isNaN(parseFloat(value as string))
}

const props = useConfiguredProps('confirm', {
  top: {
    type: positionType,
    default: 'auto',
    validator: positionValidator
  },
  left: {
    type: positionType,
    default: 'auto',
    validator: positionValidator
  },
  width: {
    type: positionType,
    default: 420,
    validator: positionValidator
  },
  maskClose: {
    type: Boolean,
    default: false
  },
  confirmType: {
    default: 'default' as ConfirmType,
    validator(value: ConfirmType) {
      return ['default', 'primary', 'info', 'success', 'warning', 'error'].includes(value)
    }
  },
  confirmText: {
    type: String,
    default: '确认'
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  icon: {
    type: [String, Object, Function] as PropType<
      string | Record<string, unknown> | (() => VNodeChild)
    >,
    default: 'question-circle'
  },
  style: {
    type: Object as PropType<CSSProperties>,
    default() {
      return {}
    }
  },
  renderer: {
    type: Function as PropType<() => VNodeChild>,
    default: null
  },
  iconColor: {
    type: String,
    default: ''
  }
})

export default defineComponent({
  name: 'Confirm',
  components: {
    Button,
    Icon,
    Modal,
    Renderer
  },
  props,
  emits: ['on-confirm', 'on-cancel'],
  setup(props) {
    const visible = ref(false)
    const loading = ref(false)
    const content = ref('')
    const iconColor = ref(props.iconColor)
    const style = ref<CSSProperties>(props.style)
    const confirmType = ref(props.confirmType)
    const confirmText = ref(props.confirmText)
    const cancelText = ref(props.cancelText)
    const maskClose = ref(props.maskClose)
    const icon = ref(props.icon)
    const renderer = ref<(() => VNodeChild) | null>(props.renderer)
    const beforeConfirm = ref<(() => unknown) | null>(null)

    const onConfirm = ref<(() => void) | null>(null)
    const onCancel = ref<(() => void) | null>(null)

    function openConfirm(options: ConfirmOptions) {
      return new Promise<boolean>(resolve => {
        content.value = options.content
        style.value = options.style ?? {}
        iconColor.value = options.iconColor ?? ''
        maskClose.value = !!options.maskClose
        confirmType.value = options.confirmType ?? props.confirmType
        confirmText.value = options.confirmText ?? props.confirmText
        cancelText.value = options.cancelText ?? props.cancelText
        icon.value = options.icon ?? props.icon
        renderer.value = isFunction(options.renderer) ? options.renderer : null
        beforeConfirm.value = isFunction(options.beforeConfirm) ? options.beforeConfirm : null

        visible.value = true

        onConfirm.value = () => {
          resolve(true)
          beforeConfirm.value = null
        }
        onCancel.value = () => {
          resolve(false)
          beforeConfirm.value = null
        }
      })
    }

    async function handleConfirm() {
      loading.value = true

      if (isFunction(beforeConfirm.value)) {
        let result = beforeConfirm.value()

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
      iconColor.value = props.iconColor
      style.value = props.style
      maskClose.value = props.maskClose
      confirmType.value = props.confirmType
      confirmText.value = props.confirmText
      cancelText.value = props.cancelText
      icon.value = ''
      ;(renderer.value as any) = null
    }

    return {
      prefix: 'vxp-confirm',
      visible,
      loading,
      content,
      style,
      iconColor,
      maskClose,
      confirmType,
      confirmText,
      cancelText,
      icon,
      renderer,

      isFunction,
      openConfirm,
      handleConfirm,
      handleCancel,
      handleReset
    }
  }
})
</script>
