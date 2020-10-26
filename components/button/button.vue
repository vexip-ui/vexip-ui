<template>
  <button
    :class="className"
    :style="style"
    :type="buttonType"
    :disabled="disabled"
    @click.left="handleClick"
    @animationend="test"
  >
    <CollapseTransition
      v-if="loading"
      appear
      horizontal
      fade-effect
    >
      <div :class="[`${prefixCls}__icon`, `${prefixCls}__icon--loading`]">
        <slot name="loading">
          <Icon
            v-if="loadingSpin"
            spin
            :name="loadingIcon"
          ></Icon>
          <Icon
            v-else
            pulse
            :name="loadingIcon"
          ></Icon>
        </slot>
      </div>
    </CollapseTransition>
    <div v-else-if="icon" :class="`${prefixCls}__icon`">
      <Icon :name="icon"></Icon>
    </div>
    <slot></slot>
  </button>
</template>

<script>
import CollapseTransition from '../collapse/collapse-transition'
import Icon from '../icon'
import { size } from '../../src/config/properties'
import '../../icons/spinner'

const { prefix } = require('../../src/style/basis/variable')

export default {
  name: 'Button',
  components: {
    CollapseTransition,
    Icon
  },
  props: {
    size,
    type: {
      validator(value) {
        return [
          'default',
          'primary',
          'dashed',
          'text',
          'info',
          'success',
          'warning',
          'error'
        ].includes(value)
      },
      default: 'default'
    },
    simple: {
      type: Boolean,
      default: false
    },
    ghost: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    loadingIcon: {
      type: String,
      default: 'spinner'
    },
    loadingSpin: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    // size: {
    //   default() {
    //     return config.button.size ?? 'default'
    //   },
    //   validator(value) {
    //     return ['small', 'default', 'large'].includes(value)
    //   }
    // },
    textColor: {
      type: String,
      default: null
    },
    buttonType: {
      type: String,
      default: 'button'
    },
    block: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefixCls: `${prefix}-button`,
      pulsing: false
    }
  },
  computed: {
    isIconOnly() {
      return !this.$slots.default
    },
    className() {
      const {
        prefixCls,
        type,
        simple,
        ghost,
        disabled,
        loading,
        circle,
        isIconOnly,
        size,
        pulsing
      } = this

      return {
        [prefixCls]: true,
        [`${prefixCls}--${type}`]: type !== 'default',
        [`${prefixCls}--simple`]: !ghost && simple,
        [`${prefixCls}--ghost`]: ghost,
        [`${prefixCls}--disabled`]: disabled,
        [`${prefixCls}--loading`]: loading,
        [`${prefixCls}--circle`]: circle,
        [`${prefixCls}--icon-only`]: isIconOnly,
        [`${prefixCls}--${size}`]: size !== 'defalut',
        [`${prefixCls}--pulsing`]: pulsing
      }
    },
    style() {
      return {
        color: this.textColor
      }
    }
  },
  methods: {
    handleClick(event) {
      this.pulsing = false

      requestAnimationFrame(() => {
        this.pulsing = true
      })

      this.$emit('on-click', event)
    },
    test() {
      this.pulsing = false
    }
  }
}
</script>
