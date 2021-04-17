<template>
  <div
    v-if="!row.hidden"
    :class="`${prefix}__group`"
    :draggable="draggable"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @dragstart.stop="handleDragStart"
    @dragover.stop="handleDragOver"
    @dragend.stop="handleDragEnd"
    @drop.stop="handleDrop"
  >
    <div ref="row" :class="className">
      <slot></slot>
    </div>
    <CollapseTransition
      v-if="!!expandColumn"
      @after-enter="computeRowHeight"
      @after-leave="computeRowHeight"
    >
      <div
        v-if="row.expanded"
        ref="expand"
        :class="`${prefix}__collapse`"
      >
        <Render
          v-if="isFunction(expandColumn.renderer)"
          :renderer="expandColumn.renderer"
          :data="{ row: row.data, rowIndex: index }"
        ></Render>
        <Render
          v-else-if="isFunction(table.expandRenderer)"
          :renderer="table.expandRenderer"
          :data="{ row: row.data, rowIndex: index }"
        ></Render>
      </div>
    </CollapseTransition>
  </div>
</template>

<script>
import CollapseTransition from '../collapse/collapse-transition'
import Render from '../basis/render'
import { TYPE_EXPAND, mapState, mapMutations } from './store'
import { config } from '@/config/properties'

const prefix = config.defaults.prefixCls

export default {
  name: 'TableRow',
  components: {
    CollapseTransition,
    Render
  },
  inject: ['table'],
  props: {
    row: {
      type: Object,
      default() {
        return {}
      }
    },
    index: {
      type: Number,
      default: null
    },
    isHead: {
      type: Boolean,
      default: false
    },
    isFixed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefix: `${prefix}-table`
    }
  },
  computed: {
    ...mapState(['columns', 'rowClass', 'highlight', 'stripe']),
    className() {
      const { prefix, rowClass, row, index, isHead, highlight } = this

      let customClass = null

      if (!isHead) {
        if (typeof rowClass === 'function') {
          customClass = rowClass(row.data, index)
        } else {
          customClass = rowClass
        }
      }

      return [
        `${prefix}__row`,
        {
          [`${prefix}__row--hover`]: highlight && row.hover
        },
        customClass
      ]
    },
    draggable() {
      return !this.isHead && this.table.rowDraggable
    },
    expandColumn() {
      return this.columns.find(column => column.type === TYPE_EXPAND)
    }
  },
  watch: {
    'row.hidden'(value) {
      if (!value) {
        this.computeRowHeight()
      }
    }
  },
  mounted() {
    this.computeRowHeight()
  },
  updated() {
    if (!this.table.rowHeight) {
      this.computeRowHeight()
    }
  },
  methods: {
    ...mapMutations(['setRowHeight', 'setRowExpandHeight', 'setRowHover']),
    isFunction(value) {
      return typeof value === 'function'
    },
    handleClick() {
      if (!this.isHead && this.table) {
        const { data, key, index } = this.row

        this.table.emitRowClick(data, key, index)
      }
    },
    computeRowHeight() {
      if (this.table.rowHeight) {
        this.$nextTick(() => {
          this.setRowHeight(this.row.key, this.table.rowHeight)

          if (this.$refs.row?.style) {
            this.$refs.row.style.height = `${this.table.rowHeight}px`
            this.$refs.row.style.maxHeight = `${this.table.rowHeight}px`
          }
        })
      } else {
        this.$nextTick(() => {
          if (!this.isFixed) {
            if (this.$refs.row?.getBoundingClientRect) {
              this.setRowHeight(this.row.key, this.$refs.row.getBoundingClientRect().height)

              if (this.$refs.expand) {
                this.setRowExpandHeight(this.row.key, this.$refs.expand.getBoundingClientRect().height)
              }
            }
          } else {
            setTimeout(() => {
              if (this.$refs.row?.style) {
                this.$refs.row.style.height = `${this.row.height}px`
              }
            }, 0)
          }
        })
      }
    },
    handleMouseEnter() {
      this.setRowHover(this.row.key, true)
    },
    handleMouseLeave() {
      this.setRowHover(this.row.key, false)
    },
    handleDragStart() {
      if (!this.draggable) return

      this.table.handleRowDragStart(this)
    },
    handleDragOver(event) {
      if (!this.draggable) return

      event.preventDefault()

      this.table.handleRowDragOver(this, event)
    },
    handleDrop(event) {
      if (!this.draggable) return

      event.preventDefault()

      this.table.handleRowDrop(this)
    },
    handleDragEnd() {
      if (!this.draggable) return

      this.table.handleRowDragEnd()
    }
  }
}
</script>
