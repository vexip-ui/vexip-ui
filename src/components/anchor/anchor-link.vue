<template>
  <li :class="`${prefix}__item`">
    <a
      ref="link"
      :class="linkClass"
      :href="to"
      :style="linkStyle"
      @click.prevent="handleSelect"
    >
      <slot></slot>
    </a>
    <ul :class="`${prefix}__list`">
      <slot name="group"></slot>
    </ul>
  </li>
</template>

<script>
import { baseIndentWidth } from './anchor'
import { findComponentUpward, removeArrayItem } from '../../utils/common'

const { prefix } = require('../../style/basis/variable')

export default {
  name: 'AnchorLink',
  inject: ['anchor'],
  props: {
    to: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      prefix: `${prefix}-anchor`,
      indent: 1
    }
  },
  computed: {
    linkClass() {
      const { prefix, anchor, to } = this

      return {
        [`${prefix}__link`]: true,
        [`${prefix}__link--active`]: to && anchor?.currentActive === to
      }
    },
    linkStyle() {
      const { indent } = this

      return {
        paddingLeft: `${baseIndentWidth * indent}px`
      }
    }
  },
  created() {
    const parentInstance = findComponentUpward(this, 'AnchorLink')

    if (
      parentInstance &&
      (!this.anchor || this.anchor === parentInstance.anchor)
    ) {
      this.indent = parentInstance.indent + 1
    }
  },
  mounted() {
    if (this.anchor) {
      this.anchor.items.push(this)
    }
  },
  beforeDestroy() {
    if (this.anchor) {
      removeArrayItem(this.anchor.items, this)
    }
  },
  methods: {
    handleSelect() {
      if (this.anchor) {
        this.anchor.handleChangeLink(this.to)
      }
    }
  }
}
</script>
