<template>
  <div
    v-if="!row.hidden"
    ref="wrapper"
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
    <div ref="rowEl" :class="className">
      <slot></slot>
    </div>
    <CollapseTransition
      v-if="!!expandColumn"
      @after-enter="computeRowHeight"
      @after-leave="computeRowHeight"
    >
      <div v-if="row.expanded" ref="expand" :class="`${prefix}__collapse`">
        <Renderer
          v-if="isFunction(expandColumn.renderer)"
          :renderer="expandColumn.renderer"
          :data="{ row: row.data, rowIndex: index }"
        ></Renderer>
        <Renderer
          v-else-if="isFunction(table.expandRenderer)"
          :renderer="table.expandRenderer"
          :data="{ row: row.data, rowIndex: index }"
        ></Renderer>
      </div>
    </CollapseTransition>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  computed,
  inject,
  watch,
  onMounted,
  onUpdated,
  nextTick,
  toRef
} from 'vue'
import { CollapseTransition } from '@/components/collapse-transition'
import { Renderer } from '@/components/renderer'
import { isFunction } from '@/common/utils/common'
import { TABLE_STORE, TABLE_ACTION } from './symbol'

import type { PropType } from 'vue'
import type { TableStore } from './store'
import type { RowState, ExpandColumn, TableAction } from './symbol'

interface TableRowProps {
  row: RowState,
  index: number,
  isHead: boolean,
  isFixed: boolean
}

export default defineComponent({
  name: 'TableRow',
  components: {
    CollapseTransition,
    Renderer
  },
  props: {
    row: {
      type: Object as PropType<RowState>,
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
  setup(props: TableRowProps) {
    const { state, mutations } = inject<TableStore>(TABLE_STORE)!
    const tableAction = inject<TableAction>(TABLE_ACTION)!

    const prefix = 'vxp-table'

    const wrapper = ref<HTMLElement | null>(null)
    const rowElement = ref<HTMLElement | null>(null)
    const expandElement = ref<HTMLElement | null>(null)

    const instance = reactive({
      el: wrapper,
      row: toRef(props, 'row')
    })

    const className = computed(() => {
      let customClass = null

      if (!props.isHead) {
        if (typeof state.rowClass === 'function') {
          customClass = state.rowClass(props.row.data, props.index)
        } else {
          customClass = state.rowClass
        }
      }

      return [
        `${prefix}__row`,
        {
          [`${prefix}__row--hover`]: state.highlight && props.row.hover
        },
        customClass
      ]
    })
    const draggable = computed(() => {
      return !props.isHead && state.rowDraggable
    })
    const expandColumn = computed(() => {
      return state.columns.find(column => (column as ExpandColumn).type === 'expand') as
        | ExpandColumn
        | undefined
    })

    watch(
      () => props.row.hidden,
      value => {
        !value && computeRowHeight()
      }
    )

    onMounted(() => {
      computeRowHeight()
    })

    onUpdated(() => {
      if (!state.rowHeight) {
        computeRowHeight()
      }
    })

    function handleClick() {
      if (!props.isHead && tableAction) {
        const { data, key, index } = props.row

        tableAction.emitRowClick(data, key, index)
      }
    }

    function computeRowHeight() {
      if (state.rowHeight) {
        nextTick(() => {
          mutations.setRowHeight(props.row.key, state.rowHeight)

          if (rowElement.value?.style) {
            rowElement.value.style.height = `${state.rowHeight}px`
            rowElement.value.style.maxHeight = `${state.rowHeight}px`
          }
        })
      } else {
        nextTick(() => {
          if (!props.isFixed) {
            if (rowElement.value?.getBoundingClientRect) {
              mutations.setRowHeight(props.row.key, rowElement.value.getBoundingClientRect().height)

              if (expandElement.value) {
                mutations.setRowExpandHeight(
                  props.row.key,
                  expandElement.value.getBoundingClientRect().height
                )
              }
            }
          } else {
            window.setTimeout(() => {
              if (rowElement.value?.style) {
                rowElement.value.style.height = `${props.row.height}px`
              }
            }, 0)
          }
        })
      }
    }

    function handleMouseEnter() {
      mutations.setRowHover(props.row.key, true)
    }

    function handleMouseLeave() {
      mutations.setRowHover(props.row.key, false)
    }

    function handleDragStart() {
      if (!draggable.value) return

      tableAction.handleRowDragStart(instance)
    }

    function handleDragOver(event: DragEvent) {
      if (!draggable.value) return

      event.preventDefault()
      tableAction.handleRowDragOver(instance, event)
    }

    function handleDrop(event: DragEvent) {
      if (!draggable.value) return

      event.preventDefault()
      tableAction.handleRowDrop(instance)
    }

    function handleDragEnd() {
      if (!draggable.value) return

      tableAction.handleRowDragEnd()
    }

    return {
      prefix,

      className,
      draggable,
      expandColumn,

      wrapper,
      rowEl: rowElement,
      expand: expandElement,

      isFunction,
      handleClick,
      handleMouseEnter,
      handleMouseLeave,
      handleDragStart,
      handleDragOver,
      handleDrop,
      handleDragEnd,
      computeRowHeight
    }
  }
})
</script>
