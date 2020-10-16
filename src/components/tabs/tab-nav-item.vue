<template>
  <li
    :class="className"
    :aria-disabled="disabled"
    @click="handleSelect"
  >
    <div :class="`${prefix}__icon`">
      <Icon v-if="icon" :name="icon"></Icon>
    </div>
    <slot>
      {{ label }}
    </slot>
  </li>
</template>

<script>
import Icon from '../icon'
import { isNull, findComponentUpward } from '../../utils/common'

const { prefix } = require('../../style/basis/variable')
const parentName = 'TabNav'

export default {
  name: 'TabNavItem',
  components: {
    Icon
  },
  props: {
    label: {
      type: [String, Number],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      prefix: `${prefix}-tab-nav`,
      active: false,
      currentLabel: this.label,
      mounted: false
    }
  },
  computed: {
    className() {
      const { prefix, active, disabled } = this
      const baseClass = `${prefix}__pane`

      return {
        [baseClass]: true,
        [`${baseClass}--disabled`]: disabled,
        [`${baseClass}--active`]: !disabled && active
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
    },
    currentLabel(value, old) {
      if (!this.mounted) {
        return
      }

      if (this.parentInstance) {
        if (!isNull(old) && this.parentInstance.currentActive === old) {
          this.parentInstance.currentActive = value
        } else {
          this.parentInstance.computeMarkPosition()
        }
      }
    }
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
  mounted() {
    this.$on('on-active-change', label => {
      this.active = this.currentLabel === label
    })

    this.$nextTick(() => {
      this.mounted = true
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
      if (this.disabled) {
        return
      }

      const left = this.$el.offsetLeft
      const width = this.$el.offsetWidth

      this.$emit('on-select', this.currentLabel)

      this.$parent.$emit('on-navbar-change', {
        label: this.currentLabel,
        left,
        width
      })
    }
  }
}
</script>
