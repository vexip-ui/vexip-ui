import { defineComponent } from 'vue'
import Title from './title'
import { useProps, booleanProp } from '@vexip-ui/config'

import type { PropType } from 'vue'
import type { TypographyType, TitleLevel } from './symbol'

function createHComponent(level: TitleLevel) {
  return defineComponent({
    name: `H${level}`,
    props: {
      type: String as PropType<TypographyType>,
      top: booleanProp,
      marker: booleanProp,
      aligned: booleanProp,
      thin: booleanProp,
      markerType: String as PropType<TypographyType>
    },
    emits: [],
    setup(_props, { slots }) {
      const props = useProps('text', _props, {
        type: 'default',
        top: false,
        marker: false,
        aligned: false,
        thin: false
      })

      return () => (
        <Title {...props} level={level}>
          {slots.default?.()}
        </Title>
      )
    }
  })
}

export const H1 = createHComponent(1)
export const H2 = createHComponent(2)
export const H3 = createHComponent(3)
export const H4 = createHComponent(4)
export const H5 = createHComponent(5)
export const H6 = createHComponent(6)
