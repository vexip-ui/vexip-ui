import { booleanProp, buildProps, styleProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ComponentSize, ConfigurableProps } from '@vexip-ui/config'
import type { SpaceAlign, SpaceJustify } from './symbol'

export const spaceProps = buildProps({
  vertical: booleanProp,
  inline: booleanProp,
  tag: String,
  align: String as PropType<SpaceAlign>,
  justify: String as PropType<SpaceJustify>,
  noWrap: booleanProp,
  size: [String, Number, Array] as PropType<ComponentSize | number | [number, number]>,
  itemStyle: styleProp,
  gapDisabled: booleanProp
})

export type SpaceProps = ExtractPropTypes<typeof spaceProps>
export type SpaceCProps = ConfigurableProps<SpaceProps>
