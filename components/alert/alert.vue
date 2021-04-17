<template>
  <CollapseTransition fade-effect @after-leave="handleAfterLeave">
    <div v-if="!closed" :class="className">
      <div v-if="hasTitle" :class="`${prefix}__title`">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div :class="`${prefix}__description`">
        <slot></slot>
      </div>
      <div v-if="hasIcon" :class="`${prefix}__icon`">
        <slot name="icon">
          <Icon :name="iconName" :style="{ color: iconColor }"></Icon>
        </slot>
      </div>
      <div
        v-if="closable"
        :class="`${prefix}__close`"
        @click="handleClose"
      >
        <slot name="close">
          <Icon name="times"></Icon>
        </slot>
      </div>
    </div>
  </CollapseTransition>
</template>

<script>
import CollapseTransition from '../collapse/collapse-transition'
import Icon from '../icon'
import { config, useConfigurableProps } from '@/config/properties'

const prefix = config.defaults.prefixCls

const predefinedIcons = {
  info: 'info-circle',
  success: 'check-circle',
  warning: 'exclamation-circle',
  error: 'times-circle'
}

const props = useConfigurableProps({
  type: {
    default: 'info',
    validator(value) {
      return ['info', 'success', 'warning', 'error'].includes(value)
    }
  },
  title: {
    type: String,
    default: ''
  },
  colorfulText: {
    type: Boolean,
    default: false
  },
  icon: {
    type: [Boolean, String],
    default: false
  },
  closable: {
    type: Boolean,
    default: false
  },
  iconColor: {
    type: String,
    default: ''
  },
  noBorder: {
    type: Boolean,
    default: false
  },
  banner: {
    type: Boolean,
    default: false
  }
})

export default {
  name: 'Alert',
  components: {
    CollapseTransition,
    Icon
  },
  props,
  emits: ['on-close', 'on-hide'],
  data() {
    return {
      prefix: `${prefix}-alert`,
      closed: false
    }
  },
  computed: {
    className() {
      const {
        prefix,
        type,
        colorfulText,
        hasTitle,
        hasIcon,
        closable,
        noBorder,
        banner
      } = this

      return {
        [prefix]: true,
        [`${prefix}--${type}`]: type,
        [`${prefix}--colorful-text`]: colorfulText,
        [`${prefix}--has-title`]: hasTitle,
        [`${prefix}--has-icon`]: hasIcon,
        [`${prefix}--closable`]: closable,
        [`${prefix}--no-border`]: !banner && noBorder,
        [`${prefix}--banner`]: banner
      }
    },
    hasTitle() {
      return !!this.title || !!this.$slots.title
    },
    hasIcon() {
      return !!(this.icon || this.$slots.icon)
    },
    iconName() {
      if (typeof this.icon === 'boolean') {
        return predefinedIcons[this.type] ?? ''
      }

      return this.icon
    }
  },
  methods: {
    handleClose() {
      this.closed = true
      this.$emit('on-close')
    },
    handleAfterLeave() {
      this.$emit('on-hide')
    }
  }
}
</script>
