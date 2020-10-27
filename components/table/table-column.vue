<template>
  <div :class="`${prefix}__column`"></div>
</template>

<script>
import { TYPE_EXPAND, TYPE_COLUMNS } from './store'
import { config } from '../../src/config/defaults'
import { removeArrayItem } from '../../src/utils/common'

const { prefix } = require('../../src/style/basis/variable')

const columnProps = {
  idKey: {
    type: [Number, String],
    required: true
  },
  name: {
    type: String,
    default: ''
  },
  accessor: {
    type: Function,
    default: null
  },
  fixed: {
    type: [String, Boolean],
    default: false
  },
  className: {
    type: [String, Array, Object],
    default: null
  },
  type: {
    type: String,
    default: null,
    validator(value) {
      return TYPE_COLUMNS.includes(value)
    }
  },
  width: {
    type: Number,
    default: null
  },
  filter: {
    type: Object,
    default() {
      return {}
    }
  },
  sorter: {
    type: Object,
    default() {
      return {}
    }
  },
  renderer: {
    type: Function,
    default: null
  },
  headRenderer: {
    type: Function,
    default: null
  },
  parseHtml: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  checkboxSize: {
    default() {
      return config.checkbox.size ?? 'default'
    },
    validator(value) {
      return ['small', 'default', 'large'].includes(value)
    }
  },
  disableRow: {
    type: Function,
    default: null
  },
  truthIndex: {
    type: Boolean,
    default: false
  },
  orderLabel: {
    type: Function,
    default: null
  }
}

const propKeys = Object.keys(columnProps)
const aliases = {
  idKey: 'key'
}

export default {
  name: 'TableColumn',
  inject: ['table'],
  props: columnProps,
  data() {
    return {
      prefix: `${prefix}-table`,
      config: {}
    }
  },
  created() {
    for (const key of propKeys) {
      const aliasKey = aliases[key] || key

      this.$set(this.config, aliasKey, this[key])
      this.$watch(key, value => {
        this.config[aliasKey] = value
      })
    }

    if (!this.type || this.type === TYPE_EXPAND) {
      this.config.renderer = (h, data) => {
        if (this.$scopedSlots.default) {
          return this.$scopedSlots.default(data)
        }

        if (typeof this.renderer === 'function') {
          return this.renderer(h, data)
        }

        const { row, rowIndex } = data

        if (typeof this.accessor === 'function') {
          const result = this.accessor(row, rowIndex)

          if (this.parseHtml) {
            return h('div', {
              domProps: { innerHTML: result }
            })
          }

          return this._v(result)
        }

        return this._v(row[this.idKey])
      }

      this.config.headRenderer = (h, data) => {
        if (this.$scopedSlots.head) {
          return this.$scopedSlots.head(data)
        }

        if (this.$slots.head) {
          return this.$slots.head
        }

        if (typeof this.headRenderer === 'function') {
          return this.renderer(h, data)
        }

        return this._v(this.name)
      }
    }

    if (this.table) {
      this.table.templateColumns.push(this.config)
    }
  },
  beforeDestroy() {
    if (this.table) {
      removeArrayItem(this.table.templateColumns, this.config)
    }
  },
  methods: {}
}
</script>
