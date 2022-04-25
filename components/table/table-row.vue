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
    @dragover="handleDragOver"
    @dragend="handleDragEnd"
    @drop="handleDrop"
  >
    <div ref="rowEl" :class="className">
      <slot></slot>
    </div>
    <CollapseTransition
      v-if="!!expandColumn"
      @after-enter="computeRectHeight"
      @after-leave="computeRectHeight"
    >
      <div
        v-if="row.expanded"
        ref="expand"
        :class="`${prefix}__collapse`"
        :style="expandStyle"
      >
        <Renderer
          v-if="isFunction(expandColumn.renderer)"
          :renderer="expandColumn.renderer"
          :data="{ row: row.data, rowIndex: index }"
        ></Renderer>
        <Renderer
          v-else-if="isFunction(expandRenderer)"
          :renderer="expandRenderer"
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
import type { RowState, ExpandColumn } from './symbol'

const props = {
  row: {
    type: Object as PropType<RowState>,
    default: () => ({})
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
}

export default defineComponent({
  name: 'TableRow',
  components: {
    CollapseTransition,
    Renderer
  },
  props,
  setup(props) {
    const { state, mutations } = inject(TABLE_STORE)!
    const tableAction = inject(TABLE_ACTION)!

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
    const draggable = computed(() => !props.isHead && state.rowDraggable)
    const dragging = computed(() => state.dragging)
    const expandColumn = computed(() => {
      return state.columns.find(column => (column as ExpandColumn).type === 'expand') as
        | ExpandColumn
        | undefined
    })
    const expandRenderer = computed(() => state.expandRenderer)
    const expandStyle = computed(() => {
      return props.isFixed
        ? {
            width: '1px',
            height: `${props.row.expandHeight}px`,
            visibility: 'hidden' as const
          }
        : undefined
    })

    function computeRectHeight() {
      computeRowHeight()
      computeBorderHeight()
    }

    watch(
      () => props.row.hidden,
      value => {
        !value && computeRectHeight()
      }
    )
    watch(
      () => props.row,
      () => {
        computeRectHeight()
      }
    )

    onMounted(() => {
      computeRectHeight()
    })

    onUpdated(() => {
      if (!state.rowHeight) {
        computeRectHeight()
      }
    })

    function computeRowHeight() {
      if (state.rowHeight) {
        mutations.setRowHeight(props.row.key, state.rowHeight)

        if (rowElement.value) {
          rowElement.value.style.height = `${state.rowHeight}px`
          rowElement.value.style.maxHeight = `${state.rowHeight}px`
        }
      } else {
        nextTick(() => {
          if (!props.isFixed) {
            if (rowElement.value) {
              mutations.setRowHeight(props.row.key, rowElement.value.getBoundingClientRect().height)
              mutations.setRowExpandHeight(
                props.row.key,
                expandElement.value?.getBoundingClientRect().height || 0
              )
            }
          } else {
            window.setTimeout(() => {
              if (rowElement.value) {
                rowElement.value.style.height = `${props.row.height}px`
              }
            }, 0)
          }
        })
      }
    }

    function computeBorderHeight() {
      if (wrapper.value) {
        const style = getComputedStyle(wrapper.value)
        const borderHeight = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth)

        mutations.setBorderHeight(props.row.key, borderHeight)
      }
    }

    function handleMouseEnter() {
      mutations.setRowHover(props.row.key, true)

      if (!props.isHead && tableAction) {
        const { data, key, index } = props.row

        tableAction.emitRowEnter(data, key, index)
      }
    }

    function handleMouseLeave() {
      mutations.setRowHover(props.row.key, false)

      if (!props.isHead && tableAction) {
        const { data, key, index } = props.row

        tableAction.emitRowLeave(data, key, index)
      }
    }

    function handleClick() {
      if (!props.isHead && tableAction) {
        const { data, key, index } = props.row

        tableAction.emitRowClick(data, key, index)
      }
    }

    function handleDragStart() {
      if (!draggable.value) return

      tableAction.handleRowDragStart(instance)
    }

    function handleDragOver(event: DragEvent) {
      if (!draggable.value || !dragging.value) return

      event.stopPropagation()
      event.preventDefault()
      tableAction.handleRowDragOver(instance, event)
    }

    function handleDrop(event: DragEvent) {
      if (!draggable.value || !dragging.value) return

      event.stopPropagation()
      event.preventDefault()
      tableAction.handleRowDrop(instance)
    }

    function handleDragEnd(event: DragEvent) {
      if (!draggable.value || !dragging.value) return

      event.stopPropagation()
      tableAction.handleRowDragEnd()
    }

    return {
      prefix,

      className,
      draggable,
      expandColumn,
      expandRenderer,
      expandStyle,

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
      computeRectHeight
    }
  }
})
</script>
