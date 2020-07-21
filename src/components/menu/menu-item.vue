<template>
  <li :class="className">
    <Tooltip
      placement="right"
      :theme="tooltipTheme"
      :transfer="true"
      :disabled="tooltipDisabled"
    >
      <div
        ref="reference"
        :class="{
          [`${prefix}__label`]: true,
          [`${prefix}__label--in-popper`]: usePopper
        }"
        :style="labelStyle"
        @click="handleSelect"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <div v-if="icon" :class="`${prefix}__icon`">
          <slot name="icon">
            <Icon :name="icon"></Icon>
          </slot>
        </div>
        <span :class="`${prefix}__title`">
          <slot>
            {{ label }}
          </slot>
        </span>
        <Icon
          v-if="isGroup"
          name="chevron-down"
          :class="{
            [`${prefix}__arrow`]: true,
            [`${prefix}__arrow--visible`]: groupExpanded
          }"
          :scale="0.8"
        ></Icon>
      </div>
      <template slot="tip">
        <span :class="`${prefix}__tooltip-title`">
          <slot>
            {{ label }}
          </slot>
        </span>
      </template>
    </Tooltip>
    <span v-if="!usePopper">
      <CollapseTransition>
        <ul
          v-show="showGroup"
          :class="[`${prefix}__list`, `${prefix}__list--${theme}`]"
        >
          <slot name="group"></slot>
        </ul>
      </CollapseTransition>
    </span>
    <transition v-else :name="transitionName">
      <div
        v-show="showGroup"
        ref="popper"
        :class="`${prefix}__popper`"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <ul :class="[`${prefix}__list`, `${prefix}__list--${theme}`]">
          <slot name="group"></slot>
        </ul>
      </div>
    </transition>
  </li>
</template>

<script>
import CollapseTransition from '../collapse/collapse-transition'
import Icon from '../icon'
import Tooltip from '../tooltip'
import { baseIndentWidth } from './menu'
import { usePopper } from '../../mixins/popper'
import { findComponentUpward, removeArrayItem } from '../../utils/common'
import 'vue-awesome/icons/chevron-down'

const { prefix } = require('../../style/basis/variable')
const popperMixin = usePopper()

delete popperMixin.props

export default {
  name: 'MenuItem',
  components: {
    CollapseTransition,
    Icon,
    Tooltip
  },
  mixins: [popperMixin],
  inject: {
    menu: { default: null }
  },
  props: {
    label: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefix: `${prefix}-menu`,
      indent: 1,
      groupExpanded: false,
      selected: false,
      items: [],
      currentExpanded: [],
      transitionName: `${prefix}-zoom`,
      placement: 'right-start',
      transfer: true,
      parentInstance: null,
      sonSelected: false
    }
  },
  computed: {
    className() {
      const {
        prefix,
        disabled,
        groupExpanded,
        selected,
        icon,
        sonSelected
      } = this
      const baseClass = `${prefix}__item`

      return {
        [baseClass]: true,
        [`${baseClass}--disabled`]: disabled,
        [`${baseClass}--group-visible`]: groupExpanded,
        [`${baseClass}--selected`]: selected,
        [`${baseClass}--no-icon`]: !icon,
        [`${baseClass}--son-selected`]: sonSelected
      }
    },
    labelStyle() {
      const { indent, parentInstance } = this

      return {
        paddingLeft:
          parentInstance && parentInstance.usePopper
            ? null
            : `${indent * baseIndentWidth}px`
      }
    },
    isGroup() {
      return !!this.$slots.group
    },
    showGroup() {
      return this.isGroup && this.groupExpanded
    },
    usePopper() {
      const { menu, isGroup, parentInstance } = this

      return (
        (menu && menu.groupType === 'dropdown') ||
        (isGroup && menu && menu.isReduced && menu === parentInstance) ||
        (parentInstance && parentInstance.usePopper)
      )
    },
    tooltipDisabled() {
      const { menu, isGroup, parentInstance } = this

      return (
        isGroup ||
        (parentInstance && parentInstance.usePopper) ||
        (menu && !menu.isReduced)
      )
    },
    theme() {
      return this.menu ? this.menu.theme : 'light'
    },
    tooltipTheme() {
      return this.menu ? this.menu.tooltipTheme : 'dark'
    }
  },
  watch: {
    label(value, old) {
      if (this.menu && this.menu.currentActive === old) {
        this.menu.handleSelect(value)
      }

      if (
        this.parentInstance &&
        this.parentInstance.currentExpanded.includes(old)
      ) {
        removeArrayItem(this.parentInstance.currentExpanded, old)
        this.parentInstance.currentExpanded.push(value)
      }
    },
    showGroup(value) {
      if (value && this.usePopper) {
        this.updatePopper()
      }
    },
    usePopper(value) {
      if (!value) {
        this.destroyPopper()
      }
    },
    selected(value) {
      if (value) {
        this.$emit('on-select')
      }

      if (
        this.parentInstance &&
        this.parentInstance.$options.name === 'MenuItem'
      ) {
        this.parentInstance.updateSonSelected()
      }
    },
    sonSelected() {
      if (
        this.parentInstance &&
        this.parentInstance.$options.name === 'MenuItem'
      ) {
        this.parentInstance.updateSonSelected()
      }
    }
  },
  created() {
    const parentInstance = findComponentUpward(this, ['Menu', 'MenuItem'])

    if (parentInstance && parentInstance.$options.name === 'MenuItem') {
      this.indent = parentInstance.indent + 1
    }
  },
  mounted() {
    const parentInstance = findComponentUpward(this, ['Menu', 'MenuItem'])

    if (parentInstance) {
      this.parentInstance = parentInstance
      parentInstance.items.push(this)
    }

    if (this.menu) {
      this.menu.items.push(this)
      this.selected = this.menu.currentActive === this.label
    }
  },
  beforeDestroy() {
    if (this.menu) {
      removeArrayItem(this.menu.items, this)
      removeArrayItem(this.menu.currentExpanded, this.label)
    }

    if (this.parentInstance) {
      removeArrayItem(this.parentInstance.items, this)
      removeArrayItem(this.parentInstance.currentExpanded, this.label)
    }
  },
  methods: {
    handleSelect() {
      if (this.disabled) return

      if (this.isGroup) {
        if (this.usePopper) return

        if (this.parentInstance) {
          this.parentInstance.handleToggleExpand(this.label)
        } else {
          this.groupExpanded = !this.groupExpanded
        }
      } else {
        this.closeGroupUpwrad()

        if (this.menu) {
          this.menu.handleSelect(this.label)
        } else {
          this.selected = true
        }
      }
    },
    handleToggleExpand(label) {
      const expanded = !this.currentExpanded.includes(label)

      if (this.menu && this.menu.accordion) {
        this.items.forEach(item => {
          item.groupExpanded = item.label === label && expanded
        })

        this.currentExpanded = []
      } else {
        const item = this.items.find(item => item.label === label)

        if (item) {
          item.groupExpanded = expanded
        }
      }

      if (expanded) {
        this.currentExpanded.push(label)
        this.menu && this.menu.$emit('on-expand', label)
      } else {
        removeArrayItem(this.currentExpanded, label)
        this.menu && this.menu.$emit('on-reduce', label)
      }
    },
    handleMouseEnter() {
      if (this.disabled || !this.usePopper) return

      if (
        this.parentInstance &&
        typeof this.parentInstance.handleMouseEnter === 'function'
      ) {
        this.parentInstance.handleMouseEnter()
      }

      if (!this.isGroup) return

      clearTimeout(this.hoverTimer)

      this.hoverTimer = setTimeout(() => {
        this.groupExpanded = true
      }, 250)
    },
    handleMouseLeave() {
      if (this.disabled || !this.usePopper) return

      if (
        this.parentInstance &&
        typeof this.parentInstance.handleMouseLeave === 'function'
      ) {
        this.parentInstance.handleMouseLeave()
      }

      if (!this.isGroup) return

      clearTimeout(this.hoverTimer)

      this.hoverTimer = setTimeout(() => {
        this.groupExpanded = false
      }, 250)
    },
    updateSonSelected() {
      this.sonSelected = !!this.items.find(
        item => item.selected || item.sonSelected
      )
    },
    closeGroupUpwrad() {
      let parent = this.parentInstance

      while (
        parent &&
        parent.$options.name === 'MenuItem' &&
        parent.usePopper
      ) {
        parent.groupExpanded = false
        parent = parent.parentInstance
      }
    }
  }
}
</script>
