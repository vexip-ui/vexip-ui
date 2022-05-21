<template>
  <!-- eslint-disable vue/no-v-html -->
  <Modal
    no-footer
    :closable="false"
    :active="visible"
    :class="[prefix, `${prefix}-vars`]"
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
            v-else
            :icon="icon || CircleQuestion"
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
        {{ cancelText || locale.cancel }}
      </Button>
      <Button
        :class="`${prefix}__button`"
        :type="confirmType"
        :loading="loading"
        @on-click="handleConfirm"
      >
        {{ confirmText || locale.confirm }}
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
import { useConfiguredProps, useLocaleConfig } from '@vexip-ui/config'
import { isPromise, isFunction } from '@vexip-ui/utils'
import { CircleQuestion } from '@vexip-ui/icons'

import type { PropType, CSSProperties } from 'vue'
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
    validator: (value: ConfirmType) => {
      return ['default', 'primary', 'info', 'success', 'warning', 'error'].includes(value)
    }
  },
  confirmText: {
    type: String,
    default: null
  },
  cancelText: {
    type: String,
    default: null
  },
  icon: {
    type: [Object, Function] as PropType<Record<string, unknown> | (() => any)>,
    default: null
  },
  style: {
    type: Object as PropType<CSSProperties>,
    default: () => ({})
  },
  renderer: {
    type: Function as PropType<() => any>,
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
    const renderer = ref<(() => any) | null>(props.renderer)
    const beforeConfirm = ref<(() => unknown) | null>(null)

    const onConfirm = ref<(() => void) | null>(null)
    const onCancel = ref<(() => void) | null>(null)

    function openConfirm(options: ConfirmOptions) {
      return new Promise<boolean>(resolve => {
        content.value = options.content ?? ''
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
      icon.value = null!
      ;(renderer.value as any) = null
    }

    return {
      CircleQuestion,

      prefix: 'vxp-confirm',
      locale: useLocaleConfig('confirm'),
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
