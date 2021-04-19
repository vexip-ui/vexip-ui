<template>
  <section :class="className">
    <div :class="`${prefix}__header`" @click="handleToggle">
      <div :class="`${prefix}__arrow`">
        <Icon name="chevron-right" :scale="0.8"></Icon>
      </div>
      <slot name="title">
        <div v-if="icon" :class="`${prefix}__icon`">
          <Icon :name="icon"></Icon>
        </div>
        {{ title }}
      </slot>
    </div>
    <CollapseTransition>
      <div v-if="currentExpanded" :class="`${prefix}__body`">
        <div :class="`${prefix}__content`" :style="contentStyle">
          <slot></slot>
        </div>
      </div>
    </CollapseTransition>
  </section>
</template>

<script>
import CollapseTransition from '../collapse/collapse-transition'
import Icon from '../icon'
import { config, useConfigurableProps } from '../../src/config/properties'
import { findComponentUpward, removeArrayItem } from '../../src/utils/common'
import '../../icons/chevron-right'

const prefix = config.defaults.prefixCls
const parentName = 'Collapse'

const props = useConfigurableProps({
  label: {
    type: [String, Number],
    default: null
  },
  title: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  contentStyle: {
    type: Object,
    default: null
  },
  expanded: {
    type: Boolean,
    default: false
  },
  card: {
    type: Boolean,
    default: false
  },
  arrowType: {
    default: 'right',
    validator(value) {
      return ['right', 'left', 'none'].includes(value)
    }
  },
  icon: {
    type: String,
    default: ''
  },
  ghost: {
    type: Boolean,
    default: false
  }
})

export default {
  name: 'CollapsePane',
  components: {
    CollapseTransition,
    Icon
  },
  model: {
    prop: 'expanded',
    event: 'on-toggle'
  },
  props,
  emits: ['on-toggle'],
  data() {
    return {
      prefix: `${prefix}-collapse`,
      parentInstance: null,
      currentExpanded: this.expanded,
      currentLabel: this.label
    }
  },
  computed: {
    className() {
      const { prefix, useCard, useGhost, useArrowType, currentExpanded, disabled } = this

      return [
        `${prefix}__pane`,
        `${prefix}__pane--arrow-${useArrowType}`,
        {
          [`${prefix}__pane--card`]: useCard,
          [`${prefix}__pane--ghost`]: !useCard && useGhost,
          [`${prefix}__pane--expanded`]: currentExpanded,
          [`${prefix}__pane--disabled`]: disabled
        }
      ]
    },
    useCard() {
      if (!this.parentInstance) {
        return this.card
      }

      return false
    },
    useGhost() {
      if (!this.parentInstance) {
        return this.ghost
      }

      return false
    },
    useArrowType() {
      if (this.parentInstance) {
        return this.parentInstance.arrowType
      }

      return this.arrowType
    }
  },
  watch: {
    expanded(value) {
      if (!this.parentInstance) {
        this.currentExpanded = value
      }
    },
    label(value) {
      const old = this.currentLabel

      this.currentLabel = value || value === 0 ? value : this.currentLabel

      if (this.parentInstance && old !== this.currentLabel) {
        this.parentInstance.toggleExpandItem(old, false)
        this.parentInstance.toggleExpandItem(this.currentLabel, true)
      }
    },
    currentExpanded(value) {
      this.$emit('on-toggle', value)
    }
  },
  created() {
    const parentInstance = findComponentUpward(this, parentName)

    if (parentInstance) {
      this.parentInstance = parentInstance

      const index = parentInstance.items.push(this) - 1

      if (!(this.label || this.label === 0)) {
        this.currentLabel = index
      }

      if (this.label || this.label === 0) {
        const expanded = parentInstance.currentExpanded

        if (Array.isArray(expanded)) {
          this.currentExpanded = expanded.includes(this.label)
        } else {
          this.currentExpanded = expanded === this.label
        }
      }
    }
  },
  beforeDestroy() {
    if (this.parentInstance) {
      this.parentInstance.toggleExpandItem(this.currentLabel, false)
      removeArrayItem(this.parentInstance.items, this)
    }
  },
  methods: {
    handleToggle() {
      if (this.disabled) return

      if (this.parentInstance) {
        this.parentInstance.toggleExpandItem(
          this.currentLabel,
          !this.currentExpanded
        )
      } else {
        this.currentExpanded = !this.currentExpanded
      }
    }
  }
}
</script>
