<template>
  <div :class="className">
    <div v-if="hasHeader" :class="`${prefix}__header`">
      <slot name="header">
        <div v-if="hasTitle" :class="`${prefix}__title`">
          <slot name="title">
            {{ title }}
          </slot>
        </div>
        <div v-if="hasExtra" :class="`${prefix}__extra`">
          <slot name="extra"></slot>
        </div>
      </slot>
    </div>
    <div :class="`${prefix}__content`" :style="contentStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { config, useConfigurableProps } from '@/config/properties'

const prefix = config.defaults.prefixCls

const props = useConfigurableProps({
  title: {
    type: String,
    default: ''
  },
  shadow: {
    default: 'always',
    validator(value) {
      return ['always', 'hover', 'never'].includes(value)
    }
  },
  contentStyle: {
    type: Object,
    default() {
      return {}
    }
  }
})

export default {
  name: 'Card',
  props,
  data() {
    return {
      prefix: `${prefix}-card`
    }
  },
  computed: {
    className() {
      const { prefix, shadow } = this

      return [prefix, `${prefix}--shadow-${shadow}`]
    },
    hasTitle() {
      return this.$slots.title || this.title
    },
    hasExtra() {
      return this.$slots.extra
    },
    hasHeader() {
      return this.$slots.header || this.hasTitle || this.hasExtra
    }
  }
}
</script>
