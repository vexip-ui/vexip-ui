import { buildProps } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { IconEffect } from './symbol'

const inOutProp = {
  type: [Boolean, String] as PropType<boolean | 'in' | 'out'>,
  default: null
}

export const iconProps = buildProps({
  icon: Object,
  scale: [Number, String] as PropType<number | string>,
  title: String,
  label: String,
  spin: inOutProp,
  pulse: inOutProp,
  flip: String as PropType<'horizontal' | 'vertical' | 'both'>,
  effect: String as PropType<IconEffect>
})

export type IconProps = ExtractPropTypes<typeof iconProps>
export type IconCProps = ConfigurableProps<IconProps, 'icon'>
