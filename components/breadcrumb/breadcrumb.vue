<template>
  <div :class="className">
    <slot></slot>
  </div>
</template>

<script>
const { prefix } = require('../../src/style/basis/variable')

export default {
  name: 'Breadcrumb',
  props: {
    separator: {
      type: String,
      default: '/'
    },
    border: {
      type: Boolean,
      default: false
    }
  },
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
