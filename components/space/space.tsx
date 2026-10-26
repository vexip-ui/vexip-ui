import { computed, defineComponent, renderSlot } from 'vue'

import { useNameHelper, useProps } from '@vexip-ui/config'
import { flatVNodes } from '@vexip-ui/hooks'
import { supportFlexGap } from '@vexip-ui/utils'
import { spaceProps } from './props'

import type { ClassType } from '@vexip-ui/config'
import type { SpaceAlign, SpaceJustify } from './symbol'

const justifyList = Object.freeze<SpaceJustify[]>([
  'start',
  'end',
  'center',
  'space-around',
  'space-between',
  'space-evenly',
])
const alignList = Object.freeze<SpaceAlign[]>(['start', 'end', 'center', 'baseline', 'stretch'])

const useFlexGap = supportFlexGap()

function parseFlexStyle(value: string) {
  return value === 'start' || value === 'end' ? `flex-${value}` : value
}

export default defineComponent({
  name: 'Space',
  props: spaceProps,
  setup(_props, { slots }) {
    const props = useProps('space', _props, {
      vertical: false,
      inline: false,
      tag: 'div',
      align: {
        default: 'stretch',
        validator: value => alignList.includes(value),
      },
      justify: {
        default: 'start',
        validator: value => justifyList.includes(value),
      },
      noWrap: false,
      size: 'default',
      itemStyle: null,
      gapDisabled: !useFlexGap,
    })

    const nh = useNameHelper('space')
    const varMap: Record<string, any> = {
      h: `var(${nh.cv('h-gap')})`,
      hh: `calc(var(${nh.cv('h-gap')}) * 0.5)`,
      mhh: `calc(var(${nh.cv('h-gap')}) * -0.5)`,
      v: `var(${nh.cv('v-gap')})`,
      hv: `calc(var(${nh.cv('v-gap')}) * 0.5)`,
      mhv: `calc(var(${nh.cv('v-gap')}) * -0.5)`,
    }

    const className = computed(() => {
      const className: ClassType = {
        [nh.b()]: true,
        [nh.bs('vars')]: true,
        [nh.bm('inherit')]: props.inherit,
        [nh.bm('inline')]: props.inline,
        [nh.bm('vertical')]: props.vertical,
        [nh.bm('no-wrap')]: props.vertical || props.noWrap,
        [nh.bm('no-gap')]: props.gapDisabled,
      }

      if (typeof props.size === 'string' && props.size !== 'default') {
        className[nh.bm(props.size)] = true
      }

      return className
    })
    const style = computed(() => {
      const { justify, align, size } = props

      const style: Record<string, string> = {
        alignItems: parseFlexStyle(align),
        justifyContent: parseFlexStyle(justify),
      }

      if (typeof size !== 'string') {
        const normalizedSize = Array.isArray(size) ? size : [size, size]

        style[nh.cv('h-gap')] = `${normalizedSize[0]}px`
        style[nh.cv('v-gap')] = `${normalizedSize[1]}px`
      }

      if (props.gapDisabled && !props.vertical) {
        style.marginTop = varMap.mhv
        style.marginBottom = varMap.mhv
      }

      return style
    })

    return () => {
      const CustomTag = props.tag || ('div' as any)
      const children = renderSlot(slots, 'default').children

      if (!children?.length) {
        return <CustomTag class={className.value} style={style.value}></CustomTag>
      }

      const vnodes = flatVNodes(children)
      const lastIndex = vnodes.length - 1
      const justify = props.justify
      const justifySpace = justify.startsWith('space')
      const notBetween = justify !== 'space-between'

      return (
        <CustomTag class={className.value} style={style.value}>
          {vnodes.map((vnode, index) => (
            <div
              key={index}
              class={nh.be('item')}
              role={'none'}
              style={[
                props.itemStyle,
                !props.gapDisabled
                  ? ''
                  : props.vertical
                    ? {
                      marginBottom: index !== lastIndex ? varMap.v : undefined,
                    }
                    : {
                      paddingTop: varMap.hv,
                      paddingBottom: varMap.hv,
                      marginRight: justifySpace
                        ? notBetween || index !== lastIndex
                          ? varMap.hh
                          : undefined
                        : index !== lastIndex
                          ? varMap.h
                          : undefined,
                      marginLeft: justifySpace
                        ? notBetween || index !== 0
                          ? varMap.hh
                          : undefined
                        : undefined,
                    },
              ]}
            >
              {vnode}
            </div>
          ))}
        </CustomTag>
      )
    }
  },
})
