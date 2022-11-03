import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { BadgeType } from './symbol'

export const badgeProps = buildProps({
  content: [Number, String],
  max: Number,
  disabled: booleanProp,
  isDot: booleanProp,
  type: String as PropType<BadgeType>,
  color: String,
  onBadgeClick: eventProp<(event: MouseEvent) => void>()
})

export type BadgeProps = ExtractPropTypes<typeof badgeProps>
export type BadgeCProps = ConfigurableProps<BadgeProps, 'content'>
