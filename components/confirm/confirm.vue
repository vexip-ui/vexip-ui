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
      <Render
        v-if="typeof renderer === 'function'"
        :renderer="renderer"
      ></Render>
      <template v-else>
        <div :class="`${prefix}__icon`">
          <Render v-if="typeof icon === 'function'" :renderer="icon"></Render>
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
        <template v-if="parseHtml">
          <div :class="`${prefix}__content`" v-html="content"></div>
        </template>
        <div v-else :class="`${prefix}__content`">
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

<script>
import Button from '../button'
import Icon from '../icon'
import Modal from '../modal'
import Render from '../basis/render'
import { isPromise } from '@/utils/common'
import { config } from '@/config/properties'

import '../../icons/question-circle'

const prefix = config.defaults.prefixCls

export default {
  name: 'Confirm',
  components: {
    Button,
    Icon,
    Modal,
    Render
  },
  data() {
    return {
      prefix: `${prefix}-confirm`,
      content: '',
      visible: false,
      top: 150,
      left: 'auto',
      width: 420,
      maskClose: false,
      confirmType: 'primary',
      confirmText: '确认',
      cancelText: '取消',
      loading: false,
      icon: null,
      style: null,
      renderer: null,
      parseHtml: false,
      iconColor: ''
    }
  },
  methods: {
    async handleConfirm() {
      this.loading = true

      if (typeof this.onConfirm === 'function') {
        let result = this.onConfirm()

        if (isPromise(result)) {
          result = await result
        }

        if (result === false) {
          this.loading = false

          return
        }
      }

      this.visible = false
      this.loading = false
    },
    handleCancel() {
      if (typeof this.onCancel === 'function') {
        this.onCancel()
      }

      this.visible = false
    },
    handleReset() {
      this.content = ''
      this.iconColor = ''
      this.style = null
      this.parseHtml = false
      this.onConfirm = null
      this.onCancel = null
      this.icon = null
      this.renderer = null
    }
  }
}
</script>
