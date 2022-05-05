import { defineComponent, reactive, computed, h, provide, toRef } from 'vue'
import { useConfiguredProps } from '@vexip-ui/config'
import { ROW_STATE } from './symbol'

import type { PropType } from 'vue'
import type { Justify, Align, ColumnFlex } from './symbol'

const props = useConfiguredProps('row', {
  tag: {
    type: String,
    default: 'div'
  },
  gutter: {
    type: [Number, Array] as PropType<number | number[]>,
    default: 0
  },
  justify: {
    default: 'start' as Justify,
    validator: (value: Justify) => {
      return ['start', 'end', 'center', 'space-around', 'space-between'].includes(value)
    }
  },
  align: {
    default: 'top' as Align,
    validator: (value: Align) => {
      return ['top', 'middle', 'bottom'].includes(value)
    }
  },
  columnFlex: {
    type: [Boolean, Object] as PropType<boolean | Partial<ColumnFlex>>,
    default: false
  }
})

export default defineComponent({
  name: 'Row',
  props,
  setup(props, { slots }) {
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
        props.tag,
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
