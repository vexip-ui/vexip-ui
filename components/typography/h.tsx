import { defineComponent } from 'vue'

import { useProps } from '@vexip-ui/config'
import Title from './title'
import { hProps } from './props'

import type { TitleLevel } from './symbol'

function createHComponent(level: TitleLevel) {
  return defineComponent({
    name: `H${level}`,
    props: hProps,
    emits: [],
    setup(_props, { slots }) {
      const props = useProps(`h${level}`, _props, {
        type: 'default',
        top: false,
        marker: false,
        aligned: false,
        thin: false,
      })

      return () => (
        <Title {...props} level={level}>
          {slots.default?.()}
        </Title>
      )
    },
  })
}

export const H1 = createHComponent(1)
export const H2 = createHComponent(2)
export const H3 = createHComponent(3)
export const H4 = createHComponent(4)
export const H5 = createHComponent(5)
export const H6 = createHComponent(6)
