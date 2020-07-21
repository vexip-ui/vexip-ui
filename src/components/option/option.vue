<template>
  <li :class="className" @click="handleSelect">
    <slot>{{ truthLabel }}</slot>
  </li>
</template>

<script>
import { isNull } from '../../utils/common'

const { prefix } = require('../../style/basis/variable')

// data:     currentLable, currentValue
// methods:  handleSelect
export const SELECTOR = 'SELECTOR'

export default {
  name: 'Option',
  inject: {
    [SELECTOR]: { default: null }
  },
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
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
      prefix: `${prefix}-option`,
      truthLabel: null,
      truthValue: null
      // selected: false
    }
  },
  computed: {
    className() {
      const { prefix, disabled, selected, divided } = this

      return {
        [prefix]: true,
        [`${prefix}--disabled`]: disabled,
        [`${prefix}--selected`]: !disabled && selected,
        [`${prefix}--divided`]: divided
      }
    },
    selected() {
      return !!(
        this[SELECTOR] && this[SELECTOR].currentValue === this.truthValue
      )
    }
  },
  watch: {
    label(value) {
      this.truthLabel = value
      this.updateSelectLable()
    },
    value(value) {
      this.truthValue = value
    }
  },
  mounted() {
    this.computeValueAndLabel()
  },
  updated() {
    this.computeValueAndLabel()
  },
  methods: {
    handleSelect() {
      if (this.disabled) {
        return
      }

      this.$emit('on-select', this.truthValue)

      if (this[SELECTOR] && typeof this[SELECTOR].handleSelect === 'function') {
        this[SELECTOR].handleSelect(this.truthLabel, this.truthValue)
      }
    },
    computeValueAndLabel() {
      this.$nextTick(() => {
        this.truthValue = isNull(this.value)
          ? this.$el.textContent.trim()
          : this.value
        this.truthLabel = !String(this.label)
          ? this.$el.textContent.trim() || this.truthValue
          : this.label

        this.updateSelectLable()
      })
    },
    updateSelectLable() {
      if (this[SELECTOR] && this[SELECTOR].currentValue === this.truthValue) {
        this[SELECTOR].currentLabel = this.truthLabel
      }
    }
  }
}
</script>
