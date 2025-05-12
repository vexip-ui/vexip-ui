import { booleanProp, buildProps, eventProp, iconProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ComponentSize, ConfigurableProps } from '@vexip-ui/config'
import type { AvatarGroupSlots, AvatarObjectFit, AvatarOption, AvatarSlots } from './symbol'

export const avatarProps = buildProps({
  size: [Number, String] as PropType<number | ComponentSize>,
  src: String,
  icon: iconProp,
  circle: booleanProp,
  alt: String,
  fit: String as PropType<AvatarObjectFit>,
  srcSet: String,
  gap: Number,
  iconScale: Number,
  fallbackSrc: String,
  color: String,
  background: String,
  slots: Object as PropType<AvatarSlots>,
  onError: eventProp<(event: Event) => void>(),
  onClick: eventProp<(event: MouseEvent) => void>(),
})

export type AvatarProps = ExtractPropTypes<typeof avatarProps>
export type AvatarCProps = ConfigurableProps<ExtractPropTypes<typeof avatarProps>, 'src'>

export const avatarGroupProps = buildProps({
  size: [Number, String] as PropType<number | ComponentSize>,
  options: Object as PropType<AvatarOption[]>,
  circle: booleanProp,
  max: Number,
  showTip: booleanProp,
  tipTrigger: String as PropType<'hover' | 'click'>,
  vertical: booleanProp,
  offset: Number,
  restColor: String,
  restBackground: String,
  slots: Object as PropType<AvatarGroupSlots>,
})

export type AvatarGroupProps = ExtractPropTypes<typeof avatarGroupProps>
export type AvatarGroupCProps = ConfigurableProps<ExtractPropTypes<typeof avatarGroupProps>>
