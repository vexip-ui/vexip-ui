<template>
  <div :class="className">
    <div :class="`${prefix}__label`" @click="handleClick">
      <slot></slot>
    </div>
    <div :class="`${prefix}__separator`" @click="handleSeparatorClick">
      <slot name="separator">
        {{ separator }}
      </slot>
    </div>
  </div>
</template>

<script>
import { isNull, findComponentUpward } from '@/utils/common'
import { config } from '@/config/properties'

const prefix = config.defaults.prefixCls

const parentName = 'Breadcrumb'

export default {
  name: 'BreadcrumbItem',
  components: {},
  props: {
    label: {
      type: [String, Number],
      default: null
    }
  },
  emits: ['on-select', 'on-separator-click'],
  data() {
    return {
      prefix: `${prefix}-breadcrumb`,
      separator: '',
      currentLabel: this.label
    }
  },
  computed: {
    className() {
      const { prefix } = this

      return {
        [`${prefix}__item`]: true
      }
    }
  },
  watch: {
    label(value) {
      if (isNull(value) && this.parentInstance) {
        const index = this.parentInstance.items.findIndex(item => item === this)

        if (~index) {
          value = index
        }
      }

      this.currentLabel = value
    }
  },
  beforeCreate() {
    this.$slots.separator = this.$parent.$slots.separator
  },
  created() {
    const parentInstance = findComponentUpward(this, parentName)

    if (parentInstance) {
      const index = parentInstance.items.push(this) - 1

      if (isNull(this.currentLabel)) {
        this.currentLabel = index
      }

      this.parentInstance = parentInstance
    }
  },
  beforeUpdate() {
    this.$slots.separator = this.$parent.$slots.separator
  },
  beforeDestroy() {
    if (this.parentInstance) {
      const index = this.$parent.items.findIndex(item => item === this)

      if (~index) {
        this.$parent.items.splice(index, 1)
      }
    }
  },
  methods: {
    handleClick() {
      this.$emit('on-select', this.label)

      if (this.parentInstance) {
        this.parentInstance.$emit('on-select', this.currentLabel)
      }
    },
    handleSeparatorClick() {
      this.$emit('on-separator-click', this.label)

      if (this.parentInstance) {
        this.parentInstance.$emit('on-separator-click', this.currentLabel)
      }
    }
  }
}
</script>
