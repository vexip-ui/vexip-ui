<template>
  <div :class="className">
    <slot></slot>
  </div>
</template>

<script>
import { useConfigurableProps } from '@/config/properties'

const { prefix } = require('@/style/basis/variable')

const props = useConfigurableProps({
  separator: {
    type: String,
    default: '/'
  },
  border: {
    type: Boolean,
    default: false
  }
})

export default {
  name: 'Breadcrumb',
  props,
  emits: ['on-select', 'on-separator-click'],
  data() {
    return {
      prefix: `${prefix}-breadcrumb`,
      items: []
    }
  },
  computed: {
    className() {
      const { prefix, border } = this

      return {
        [prefix]: true,
        [`${prefix}--border`]: border
      }
    }
  },
  watch: {
    separator() {
      this.upadteItemSeparator()
    }
  },
  mounted() {
    this.upadteItemSeparator()
  },
  updated() {
    this.$nextTick(() => {
      this.upadteItemSeparator()
    })
  },
  methods: {
    upadteItemSeparator() {
      this.items.forEach(item => {
        item.separator = this.separator
      })
    }
  }
}
</script>
