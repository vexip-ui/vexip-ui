import { buildProps } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { IconEffect } from './symbol'

export const iconProps = buildProps({
  icon: Object,
  scale: [Number, String],
  title: String,
  label: String,
  flip: String as PropType<'horizontal' | 'vertical' | 'both'>,
  effect: String as PropType<IconEffect>,
  size: String,
  color: String,
  rotate: [Number, String]
})

export type IconProps = ExtractPropTypes<typeof iconProps>
export type IconCProps = ConfigurableProps<IconProps, 'icon'>
