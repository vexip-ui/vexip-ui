import { defineComponent, reactive, watch, inject, onBeforeUnmount, onBeforeUpdate } from 'vue'
import { useProps, createSizeProp } from '@vexip-ui/config'
import { isNull } from '@vexip-ui/utils'
import { tableColumnProps } from './props'
import { TABLE_ACTIONS, columnTypes } from './symbol'

import type { Data, TableRowState, ColumnWithKey } from './symbol'

type ColumnPropKey = keyof typeof tableColumnProps

const propKeys = Object.keys(tableColumnProps) as ColumnPropKey[]
const aliases: Partial<Record<ColumnPropKey, string>> = {
  idKey: 'key'
}
const deepProps: ColumnPropKey[] = ['className', 'style', 'attrs', 'filter', 'sorter', 'metaData']

const rendererProp = {
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
        validator: (value: number | string) => !isNull(value),
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
      renderer: rendererProp,
      headRenderer: rendererProp,
      filterRenderer: rendererProp,
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
      metaData: {
        default: () => ({}),
        validator: (value: Data) => !isNull(value)
      }
    })

    const tableAction = inject(TABLE_ACTIONS, null)
    const options = reactive({}) as ColumnWithKey

    for (const key of propKeys) {
      if (key === 'renderer' || key === 'headRenderer') continue

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

    setRenderer()
    setHeadRenderer()
    setFilterRenderer()

    tableAction?.increaseColumn(options)

    onBeforeUpdate(() => {
      setRenderer()
      setHeadRenderer()
      setFilterRenderer()
    })

    onBeforeUnmount(() => {
      tableAction?.decreaseColumn(options)
    })

    function setRenderer() {
      options.renderer = (data: any) => {
        if (typeof slots.default === 'function') {
          return slots.default(data)
        }

        if (typeof props.renderer === 'function') {
          return props.renderer(data)
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
      options.headRenderer = (data: any) => {
        if (typeof slots.head === 'function') {
          return slots.head(data)
        }

        if (typeof props.headRenderer === 'function') {
          return props.headRenderer(data)
        }

        return props.name
      }
    }

    function setFilterRenderer() {
      if (typeof slots.filter === 'function' || typeof props.filterRenderer === 'function') {
        options.filterRenderer = (data: any) => {
          if (typeof slots.filter === 'function') {
            return slots.filter(data)
          }

          return props.filterRenderer(data)
        }
      } else {
        options.filterRenderer = undefined
      }
    }

    return () => null
  }
})
