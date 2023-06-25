import { defineComponent, inject, onBeforeUnmount, reactive, renderSlot, watch } from 'vue'

import { createSizeProp, useProps } from '@vexip-ui/config'
import { isNull, warnOnce } from '@vexip-ui/utils'
import { tableColumnProps } from './props'
import { TABLE_ACTIONS, columnTypes } from './symbol'

import type { ColumnWithKey, Data, TableRowState, TableTextAlign } from './symbol'

type ColumnPropKey = keyof typeof tableColumnProps

const propKeys = Object.keys(tableColumnProps) as ColumnPropKey[]
const aliases: Partial<Record<ColumnPropKey, string>> = {
  idKey: 'key'
}
const deepProps: ColumnPropKey[] = [
  'class',
  'style',
  'attrs',
  'filter',
  'sorter',
  'metaData',
  'meta'
]
const ignoredProps: ColumnPropKey[] = [
  'renderer',
  'headRenderer',
  'filterRenderer',
  'summaryRenderer'
]
const aligns: TableTextAlign[] = ['left', 'center', 'right']

const funcProp = {
  default: null,
  isFunc: true,
  static: true
}

export default defineComponent({
  name: 'TableColumn',
  props: tableColumnProps,
  setup(_props, { slots }) {
    const props = useProps('tableColumn', _props, {
      idKey: {
        default: null,
        validator: value => !isNull(value),
        static: true
      },
      name: {
        default: '',
        static: true
      },
      accessor: {
        default: null,
        isFunc: true,
        static: true
      },
      fixed: {
        default: false,
        static: true
      },
      className: null,
      class: null,
      style: null,
      attrs: null,
      type: {
        default: null,
        validator: value => columnTypes.includes(value),
        static: true
      },
      width: null,
      filter: null,
      sorter: false,
      renderer: funcProp,
      headRenderer: funcProp,
      filterRenderer: funcProp,
      order: {
        default: 0,
        static: true
      },
      noEllipsis: false,
      checkboxSize: createSizeProp(),
      disableRow: {
        default: null,
        isFunc: true
      },
      truthIndex: false,
      orderLabel: {
        default: null,
        isFunc: true
      },
      metaData: null,
      meta: null,
      textAlign: {
        default: 'left',
        validator: value => aligns.includes(value)
      },
      headSpan: {
        default: 1,
        static: true
      },
      cellSpan: funcProp,
      noSummary: false,
      summaryRenderer: funcProp
    })

    const tableAction = inject(TABLE_ACTIONS, null)
    const options = reactive({}) as ColumnWithKey

    if (!isNull(props.className)) {
      warnOnce(
        "[vexip-ui:TableColumn] 'class-name' prop has been deprecated, please " +
          "use 'class' prop to replace it"
      )
    }

    if (!isNull(props.metaData)) {
      warnOnce(
        "[vexip-ui:TableColumn] 'meta-data' prop has been deprecated, please " +
          "use 'meta' prop to replace it"
      )
    }

    for (const key of propKeys) {
      if (ignoredProps.includes(key)) continue

      const aliasKey = (aliases[key] || key) as keyof ColumnWithKey

      ;(options[aliasKey] as any) = props[key]

      if (key === 'idKey') {
        watch(
          () => props[key],
          value => {
            if (isNull(value) && props.type) {
              (options[aliasKey] as any) = value = `__vxp_${props.type}`
            } else {
              (options[aliasKey] as any) = value
            }
          },
          { immediate: true }
        )
      } else {
        watch(
          () => props[key],
          value => {
            (options[aliasKey] as any) = value
          },
          { deep: deepProps.includes(key) }
        )
      }
    }

    watch(() => props.renderer, setRenderer)
    watch(() => props.headRenderer, setHeadRenderer)
    watch(() => props.filterRenderer, setFilterRenderer)
    watch(() => props.summaryRenderer, setSummaryRenderer)

    setRenderer()
    setHeadRenderer()
    setFilterRenderer()
    setSummaryRenderer()

    tableAction?.increaseColumn(options)

    // TODO: 在动态列时会触发无限 watch，初步估计是重置单元格合并状态导致的
    // onBeforeUpdate(() => {
    //   setRenderer()
    //   setHeadRenderer()
    //   setFilterRenderer()
    // })

    onBeforeUnmount(() => {
      tableAction?.decreaseColumn(options)
    })

    function setRenderer() {
      if (options.type && options.type !== 'expand') {
        (options as any).renderer = undefined
        return
      }

      options.renderer = (data: any) => {
        if (typeof slots.default === 'function') {
          return renderSlot(slots, 'default', data)
        }

        if (typeof props.renderer === 'function') {
          return props.renderer(data)
        }

        if (options.type === 'expand') {
          return ''
        }

        const row = data.row
        const rowIndex = data.rowIndex as number

        if (typeof props.accessor === 'function') {
          const result = props.accessor(row as Data, rowIndex)

          return isNull(result) ? '' : String(result)
        }

        const result = (row as TableRowState)[options.key as unknown as keyof TableRowState]

        return isNull(result) ? '' : String(result)
      }
    }

    function setHeadRenderer() {
      if (options.type === 'selection') {
        (options as any).renderer = undefined
        return
      }

      options.headRenderer = data => {
        if (typeof slots.head === 'function') {
          return renderSlot(slots, 'head', data)
        }

        if (typeof props.headRenderer === 'function') {
          return props.headRenderer(data)
        }

        return props.name
      }
    }

    function setFilterRenderer() {
      if (typeof slots.filter === 'function' || typeof props.filterRenderer === 'function') {
        options.filterRenderer = data => {
          if (typeof slots.filter === 'function') {
            return renderSlot(slots, 'filter', data)
          }

          return props.filterRenderer(data)
        }
      } else {
        options.filterRenderer = undefined
      }
    }

    function setSummaryRenderer() {
      if (typeof slots.summary === 'function' || typeof props.summaryRenderer === 'function') {
        options.summaryRenderer = data => {
          if (typeof slots.summary === 'function') {
            return renderSlot(slots, 'summary', data)
          }

          if (typeof props.summaryRenderer === 'function') {
            return props.summaryRenderer(data)
          }

          return ''
        }
      } else {
        options.summaryRenderer = undefined
      }
    }

    return () => null
  }
})
