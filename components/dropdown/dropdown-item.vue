<template>
  <li :class="className" @click="handleSelect">
    <slot>{{ name }}</slot>
  </li>
</template>

<script>
import { findComponentUpward } from '@/utils/common'
import { config } from '@/config/properties'

const prefix = config.defaults.prefixCls

const parentName = 'Dropdown'

export default {
  name: 'DropdownItem',
  props: {
    name: {
      type: [String, Number],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    },
    divided: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefix: `${prefix}-dropdown`,
      label: null,
      isReference: false,
      parentInstance: null
    }
  },
  computed: {
    className() {
      const { prefix, disabled, currentSelected, divided } = this
      const baseClass = `${prefix}__item`

      return {
        [baseClass]: true,
        [`${baseClass}--disabled`]: disabled,
        [`${baseClass}--selected`]: !disabled && currentSelected,
        [`${baseClass}--divided`]: divided
      }
    },
    textContent() {
      return this.$el.textContent
    },
    currentSelected() {
      if (this.parentInstance && this.parentInstance.isUseValue) {
        return (
          this.parentInstance.currentValue &&
          this.parentInstance.currentValue.includes(this.label)
        )
      }

      return this.selected
    }
  },
  watch: {
    name(value) {
      this.label = value
    }
  },
  mounted() {
    const parentInstance = findComponentUpward(this, parentName)
    const listIntance = findComponentUpward(this, 'DropdownList')

    if (parentInstance) {
      this.parentInstance = parentInstance
      parentInstance.items.push(this)

      this.$nextTick(() => {
        if (listIntance && listIntance.parentInstance !== parentInstance) {
          this.isReference = true
        }
      })
    }

    this.$nextTick(() => {
      this.label =
        this.name === undefined || this.name == null
          ? this.textContent
          : this.name
    })
  },
  beforeDestroy() {
    if (this.parentInstance) {
      const index = this.parentInstance.items.findIndex(item => item === this)

      if (~index) {
        this.parentInstance.items.splice(index, 1)
      }
    }
  },
  methods: {
    handleSelect() {
      if (this.disabled || this.isReference) {
        return
      }

      if (this.parentInstance) {
        this.parentInstance.$emit('on-select', this.label, this.textContent)
      }

      this.$emit('on-select', this.label)
    }
  }
}
</script>
