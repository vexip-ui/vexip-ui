import { defineComponent, reactive, computed, toRef, h, provide } from 'vue'
import { useProps, booleanProp } from '@vexip-ui/config'
import { GRID_STATE } from './symbol'

import type { PropType, CSSProperties } from 'vue'
import type {
  LayoutProp,
  GridJustify,
  GridAlign,
  CellFlex
} from './symbol'

const numberRE = /^\d+$/

const justifyList = Object.freeze<GridJustify>(['start', 'end', 'center', 'space-around', 'space-between', 'space-evenly'])
const alignList = Object.freeze<GridAlign>(['top', 'middle', 'bottom', 'stretch'])

export default defineComponent({
  name: 'Grid',
  props: {
    tag: String,
    gap: [Number, Array] as PropType<number | number[]>,
    rows: [Number, String, Array] as PropType<LayoutProp>,
    columns: [Number, String, Array] as PropType<LayoutProp>,
    autoRows: [Number, String, Array] as PropType<LayoutProp>,
    autoColumns: [Number, String, Array] as PropType<LayoutProp>,
    dense: booleanProp,
    justify: String as PropType<GridJustify>,
    align: String as PropType<GridAlign>,
    cellFlex: [Boolean, Object] as PropType<boolean | Partial<CellFlex>>
  },
  setup(_props, { slots }) {
    const props = useProps('grid', _props, {
      tag: 'div',
      gap: 0,
      rows: 'none',
      columns: 24,
      autoRows: 'auto',
      autoColumns: 'auto',
      dense: false,
      justify: {
        default: 'start' as GridJustify,
        validator: (value: GridJustify) => justifyList.includes(value)
      },
      align: {
        default: 'stretch' as GridAlign,
        validator: (value: GridAlign) => alignList.includes(value)
      },
      cellFlex: false
    })

    const prefix = 'vxp-grid'

    const className = computed(() => {
      return {
        [prefix]: true,
        [`${prefix}--${props.justify}`]: true,
        [`${prefix}--${props.align}`]: props.align !== 'stretch',
        [`${prefix}--densc`]: props.dense
      }
    })
    const style = computed(() => {
      const style: CSSProperties = {}

      if (props.gap) {
        style.gap = Array.isArray(props.gap) ? `${props.gap[0]}px ${props.gap[1]}px` : `${props.gap}px`
      }

      style.gridTemplateColumns = parseSizeLayout(props.columns)

      if (props.rows !== 'none') {
        style.gridTemplateRows = parseSizeLayout(props.rows)
      }

      if (props.autoRows !== 'auto') {
        style.gridAutoRows = parseAutoLayout(props.autoRows)
      }

      if (props.autoColumns !== 'auto') {
        style.gridAutoColumns = parseAutoLayout(props.autoColumns)
      }

      return style
    })
    const cellFlex = computed(() => {
      if (props.cellFlex === true) {
        return {
          justify: 'start',
          align: 'top'
        }
      } else if (props.cellFlex) {
        return {
          justify: 'start',
          align: 'top',
          ...props.cellFlex
        }
      }

      return false
    })

    provide(GRID_STATE, reactive({ cellFlex, columns: toRef(props, 'columns') }))

    function parseSizeLayout(value: LayoutProp) {
      if (typeof value === 'number') {
        return `repeat(${value}, 1fr)`
      }

      if (typeof value === 'string') {
        return numberRE.test(value.trim()) ? `repeat(${value}, 1fr)` : value
      }

      if (Array.isArray(value)) {
        return value.map(item => {
          if (typeof item === 'number') {
            return `${item}fr`
          }

          if (typeof item === 'string') {
            return numberRE.test(item.trim()) ? `${item}fr` : item
          }

          return item
        }).join(' ')
      }

      return value
    }

    function parseAutoLayout(value: LayoutProp) {
      if (typeof value === 'number') {
        return `${value}fr`
      }

      if (typeof value === 'string') {
        return numberRE.test(value.trim()) ? `repeat(${value}, 1fr)` : value
      }

      if (Array.isArray(value)) {
        return value.map(item => {
          if (typeof item === 'number') {
            return `${item}fr`
          }

          if (typeof item === 'string') {
            return numberRE.test(item.trim()) ? `${item}fr` : item
          }

          return item
        }).join(' ')
      }

      return value
    }

    return () => h(
      props.tag || 'div',
      {
        class: className.value,
        style: style.value
      },
      {
        default: () => slots.default?.()
      }
    )
  }
})
