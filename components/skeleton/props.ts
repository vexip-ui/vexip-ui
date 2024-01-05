import { booleanProp, booleanStringProp, buildProps, iconProp, sizeProp } from '@vexip-ui/config'

import type { ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const skeletonProps = buildProps({
  size: sizeProp,
  width: [Number, String],
  height: [Number, String],
  repeat: Number,
  tag: String,
  activated: booleanProp,
  image: booleanProp,
  imageIcon: iconProp,
  iconScale: Number,
  round: booleanProp,
  circle: booleanProp,
  block: booleanProp,
  spread: Number,
  loading: booleanProp
})

export type SkeletonProps = ExtractPropTypes<typeof skeletonProps>
export type SkeletonCProps = ConfigurableProps<SkeletonProps>

export const skeletonGroupProps = buildProps({
  size: sizeProp,
  tag: booleanStringProp,
  itemTag: String,
  activated: booleanProp,
  round: booleanProp,
  circle: booleanProp,
  block: booleanProp,
  loading: booleanProp
})

export type SkeletonGroupProps = ExtractPropTypes<typeof skeletonGroupProps>
export type SkeletonGroupCProps = ConfigurableProps<SkeletonGroupProps>
