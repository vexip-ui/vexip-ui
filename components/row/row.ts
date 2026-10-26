import { computed, defineComponent, h, provide, reactive, toRef } from 'vue'

import { useNameHelper, useProps } from '@vexip-ui/config'
import { rowProps } from './props'
import { ROW_STATE } from './symbol'

import type { RowGridAlign, RowGridJustify, RowState } from './symbol'

const justifyList = Object.freeze<RowGridJustify[]>([
  'start',
  'end',
  'center',
  'space-around',
  'space-between',
  'space-evenly',
])
const alignList = Object.freeze<RowGridAlign[]>(['top', 'middle', 'bottom', 'stretch'])

export default defineComponent({
  name: 'Row',
  props: rowProps,
  setup(_props, { slots }) {
    const props = useProps('row', _props, {
      tag: 'div',
      gap: 0,
      justify: {
        default: 'start',
        validator: value => justifyList.includes(value),
      },
      align: {
        default: 'top',
        validator: value => alignList.includes(value),
      },
      columnFlex: false,
    })

    const nh = useNameHelper('row')

    const className = computed(() => {
      return [
        nh.b(),
        nh.bs('vars'),
        nh.bm(props.justify),
        nh.bm(props.align),
        {
          [nh.bm('inherit')]: props.inherit,
        },
      ]
    })
    const style = computed(() => {
      if (!props.gap) return null

      if (typeof props.gap === 'number') {
        return {
          [nh.cv('h-gap')]: `${props.gap}px`,
        }
      }

      if (Array.isArray(props.gap)) {
        const [horizontal, vertical] = props.gap

        return {
          [nh.cv('h-gap')]: `${horizontal}px`,
          [nh.cv('v-gap')]: `${vertical}px`,
        }
      }

      return null
    })
    const columnFlex = computed(() => {
      if (props.columnFlex === true) {
        return {
          justify: 'start',
          align: 'top',
        }
      } else if (props.columnFlex) {
        return {
          justify: 'start',
          align: 'top',
          ...props.columnFlex,
        }
      }

      return false
    })

    provide(
      ROW_STATE,
      reactive({
        columnFlex,
        gap: toRef(props, 'gap'),
      }) as RowState,
    )

    return () =>
      h(
        props.tag || 'div',
        {
          class: className.value,
          style: style.value,
        },
        {
          default: () => slots.default && slots.default(),
        },
      )
  },
})
