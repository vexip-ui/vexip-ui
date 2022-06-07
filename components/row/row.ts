import { defineComponent, reactive, computed, h, provide, toRef } from 'vue'
import { useProps } from '@vexip-ui/config'
import { ROW_STATE } from './symbol'

import type { PropType } from 'vue'
import type { Justify, Align, ColumnFlex } from './symbol'

const justifyList = Object.freeze<Justify>(['start', 'end', 'center', 'space-around', 'space-between'])
const alignList = Object.freeze<Align>(['top', 'middle', 'bottom'])

export default defineComponent({
  name: 'Row',
  props: {
    tag: String,
    gutter: [Number, Array] as PropType<number | number[]>,
    justify: String as PropType<Justify>,
    align: String as PropType<Align>,
    columnFlex: [Boolean, Object] as PropType<boolean | Partial<ColumnFlex>>
  },
  setup(_props, { slots }) {
    const props = useProps('row', _props, {
      tag: 'div',
      gutter: 0,
      justify: {
        default: 'start' as Justify,
        validator: (value: Justify) => justifyList.includes(value)
      },
      align: {
        default: 'top' as Align,
        validator: (value: Align) => alignList.includes(value)
      },
      columnFlex: false
    })

    const prefix = 'vxp-row'

    const className = computed(() => {
      return [prefix, `${prefix}--${props.justify}`, `${prefix}--${props.align}`]
    })
    const style = computed(() => {
      if (!props.gutter) return null

      if (typeof props.gutter === 'number') {
        const horizontalMargin = `-${props.gutter / 2}px`

        return {
          marginRight: horizontalMargin,
          marginLeft: horizontalMargin
        }
      }

      if (Array.isArray(props.gutter)) {
        const [horizontal, vertical] = props.gutter
        const horizontalMargin = `-${horizontal / 2}px`
        const verticalMargin = `${vertical / 2}px`

        return {
          margin: `-${verticalMargin} ${horizontalMargin} ${verticalMargin}`
        }
      }

      return null
    })
    const columnFlex = computed(() => {
      if (props.columnFlex === true) {
        return {
          justify: 'start',
          align: 'top'
        }
      } else if (props.columnFlex) {
        return {
          justify: 'start',
          align: 'top',
          ...props.columnFlex
        }
      }

      return false
    })

    provide(ROW_STATE, reactive({
      columnFlex,
      gutter: toRef(props, 'gutter')
    }))

    return () =>
      h(
        props.tag || 'div',
        {
          class: className.value,
          style: style.value
        },
        {
          default: () => slots.default && slots.default()
        }
      )
  }
})
