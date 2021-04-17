<template>
  <div v-show="wrapShow" :class="className">
    <transition
      v-if="!disabled"
      :name="maskTransition"
      @after-enter="afterOpen"
      @after-leave="afterClose"
    >
      <div
        v-show="currentActive"
        :class="`${prefix}__mask`"
        @click="handleClose"
      ></div>
    </transition>
    <transition :name="transitionName">
      <slot :show="currentActive"></slot>
    </transition>
  </div>
</template>

<script>
import TransferDom from '@/mixins/transfer-dom'
import { config, useConfigurableProps } from '@/config/properties'
import { isPromise } from '@/utils/common'

const prefix = config.defaults.prefixCls

const props = useConfigurableProps({
  active: {
    type: Boolean,
    default: false
  },
  closable: {
    type: Boolean,
    default: false
  },
  inner: {
    type: Boolean,
    default: false
  },
  maskTransition: {
    type: String,
    default: `${prefix}-fade`
  },
  transitionName: {
    type: String,
    default: `${prefix}-fade`
  },
  disabled: {
    type: Boolean,
    default: false
  },
  beforeClose: {
    type: Function,
    default: null
  }
})

export default {
  name: 'Masker',
  mixins: [TransferDom],
  model: {
    prop: 'active',
    event: 'on-toggle'
  },
  props,
  emits: ['on-toggle', 'before-close', 'on-close', 'on-hide', 'update:active'],
  data() {
    return {
      prefix: `${prefix}-masker`,
      currentActive: this.active,
      wrapShow: this.active
    }
  },
  computed: {
    className() {
      const { prefix, inner, disabled } = this

      return [
        prefix,
        {
          [`${prefix}--inner`]: inner,
          [`${prefix}--disabled`]: disabled
        }
      ]
    }
  },
  watch: {
    active(value) {
      this.currentActive = value

      if (value) {
        this.wrapShow = value
      }
    },
    currentActive(value) {
      this.$emit('on-toggle', value)
    }
  },
  methods: {
    toggleActive(value) {
      this.currentActive = value
    },
    async handleClose() {
      if (!this.closable) return

      let result = false

      if (typeof this.beforeClose === 'function') {
        result = this.beforeClose()

        if (isPromise(result)) {
          result = await result
        }
      }

      if (result !== false) {
        this.$nextTick(() => {
          this.toggleActive(false)
          this.$emit('on-close')
        })
      }
    },
    afterClose() {
      this.$nextTick(() => {
        this.wrapShow = false
        this.$emit('on-hide')
      })
    },
    afterOpen() {
      this.$nextTick(() => {
        this.$emit('on-show')
      })
    }
  }
}
</script>
