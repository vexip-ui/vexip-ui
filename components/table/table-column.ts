import {
  defineComponent,
  inject,
  onBeforeUnmount,
  onBeforeUpdate,
  reactive,
  renderSlot,
  watch
} from 'vue'

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
const deepProps: ColumnPropKey[] = ['class', 'style', 'attrs', 'filter', 'sorter', 'metaData']
const aligns: TableTextAlign[] = ['left', 'center', 'right']

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
        validator: value => !isNull(value)
      },
      textAlign: {
        default: 'left',
        validator: value => aligns.includes(value)
      }
    })

    const tableAction = inject(TABLE_ACTIONS, null)
    const options = reactive({}) as ColumnWithKey

    if (!isNull(props.className)) {
      warnOnce(
        "[vexip-ui:TableColumn] 'class-name' prop has been deprecated, please " +
          "use 'class' prop to replace it"
      )
    }

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
      if (options.type && options.type !== 'expand') return

      options.renderer = (data: any) => {
        if (typeof slots.default === 'function') {
          return renderSlot(slots, 'default', data)
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
      if (options.type === 'selection') return

      options.headRenderer = (data: any) => {
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
        options.filterRenderer = (data: any) => {
          if (typeof slots.filter === 'function') {
            return renderSlot(slots, 'filter', data)
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
