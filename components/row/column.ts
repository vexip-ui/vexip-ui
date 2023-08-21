import { computed, defineComponent, h, inject, provide } from 'vue'

import { useNameHelper, useProps } from '@vexip-ui/config'
import { columnProps } from './props'
import { ROW_STATE, breakPoints } from './symbol'

import type { CSSProperties } from 'vue'
import type { ClassType } from '@vexip-ui/config'

type LayerProp = 'span' | 'offset' | 'pull' | 'push' | 'order'

const colProps: LayerProp[] = ['span', 'offset', 'pull', 'push', 'order']

export default defineComponent({
  name: 'Column',
  props: columnProps,
  setup(_props, { slots }) {
    const props = useProps('column', _props, {
      tag: 'div',
      span: 24,
      offset: null,
      push: null,
      pull: null,
      order: null,
      xs: null,
      sm: null,
      md: null,
      lg: null,
      xl: null,
      xxl: null,
      flex: null,
      useFlex: null
    })

    const rowState = inject(ROW_STATE, null)
    const nh = useNameHelper('column')

    provide(ROW_STATE, null!)

    const className = computed(() => {
      const columnFlex = (props.useFlex || rowState?.columnFlex) && {
        ...(rowState?.columnFlex || {}),
        ...(props.useFlex
          ? props.useFlex === true
            ? { justify: 'start', align: 'top' }
            : props.useFlex
          : {})
      }
      const className: ClassType = [
        nh.b(),
        nh.bs('vars'),
        {
          [nh.bm('flex')]: columnFlex,
          [nh.bm('inherit')]: rowState || props.inherit
        }
      ]

      if (columnFlex) {
        columnFlex.justify && className.push(nh.bm(columnFlex.justify))
        columnFlex.align && className.push(nh.bm(columnFlex.align))
      }

      colProps.forEach(prop => {
        if (typeof props[prop] === 'number') {
          className.push(
            prop === 'span' ? nh.bm(`${props[prop]}`) : nh.bm(`${prop}-${props[prop]}`)
          )
        }
      })

      breakPoints.forEach(size => {
        const sizeProp = props[size]

        if (!sizeProp && sizeProp !== 0) return

        if (typeof sizeProp === 'number') {
          className.push(nh.bm(`${size}-${sizeProp}`))
        } else if (typeof sizeProp === 'object') {
          colProps.forEach(prop => {
            const value = sizeProp[prop]

            if (!value && value !== 0) return

            className.push(prop === 'span' ? nh.bm(`${value}`) : nh.bm(`${prop}-${value}`))
          })
        }
      })

      return className
    })
    const style = computed(() => {
      const flex = props.flex
      const style: CSSProperties = {}

      if (rowState) {
        if (typeof rowState.gap === 'number') {
          style.paddingInlineStart = style.paddingInlineEnd = `${rowState.gap / 2}px`
        } else if (Array.isArray(rowState.gap)) {
          style.paddingInlineStart = style.paddingInlineEnd = `${rowState.gap[0] / 2}px`
        }
      }

      if (flex) {
        if (typeof flex === 'number') {
          style.flex = `${flex} ${flex} auto`
        } else if (typeof flex === 'string') {
          if (/^\d+\s\d+\s\d+(\w+)?$/.test(flex)) {
            style.flex = flex
          } else {
            style.flex = flex === 'auto' ? '1 1 auto' : `0 0 ${flex}`
          }
        }
      }

      return style
    })

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
