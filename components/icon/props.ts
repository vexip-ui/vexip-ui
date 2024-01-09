import { buildProps, iconProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { IconEffect, IconRenderer } from './symbol'

export const iconProps = buildProps({
  icon: iconProp,
  scale: [Number, String],
  title: String,
  label: String,
  flip: String as PropType<'horizontal' | 'vertical' | 'both'>,
  effect: String as PropType<IconEffect>,
  size: String,
  color: String,
  rotate: [Number, String],
  renderer: Function as PropType<IconRenderer>
})

export type IconProps = ExtractPropTypes<typeof iconProps>
export type IconCProps = ConfigurableProps<IconProps, 'icon'>
