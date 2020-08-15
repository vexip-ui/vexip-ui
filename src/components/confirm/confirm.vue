<template>
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
    <div :class="`${prefix}__body`">
      <Icon
        name="question-circle"
        :scale="2.2"
        :class="`${prefix}__icon`"
      ></Icon>
      <span :class="`${prefix}__content`">
        {{ content }}
      </span>
    </div>
    <div :class="`${prefix}__actions`">
      <Button
        :class="`${prefix}__button`"
        :type="confirmType"
        @on-click="handleConfirm"
      >
        {{ confirmText }}
      </Button>
      <Button :class="`${prefix}__button`" @on-click="handleCancel">
        {{ cancelText }}
      </Button>
    </div>
  </Modal>
</template>

<script>
import Button from '../button'
import Icon from '../icon'
import Modal from '../modal'
import 'vue-awesome/icons/question-circle'

const { prefix } = require('../../style/basis/variable')

export default {
  name: 'Confirm',
  components: {
    Button,
    Icon,
    Modal
  },
  data() {
    return {
      prefix: `${prefix}-confirm`,
      content: '',
      visible: true,
      top: 150,
      left: 'auto',
      width: 420,
      maskClose: false,
      confirmType: 'primary',
      confirmText: '确认',
      cancelText: '取消'
    }
  },
  methods: {
    handleConfirm() {
      if (typeof this.onConfirm === 'function') {
        this.onConfirm()
      }

      this.visible = false
    },
    handleCancel() {
      if (typeof this.onCancel === 'function') {
        this.onCancel()
      }

      this.visible = false
    },
    handleReset() {
      this.content = ''
      this.onConfirm = null
      this.onCancel = null
    }
  }
}
</script>
