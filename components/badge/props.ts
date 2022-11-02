import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const badgeProps = buildProps({
  //
})

export type BadgeProps = ExtractPropTypes<typeof badgeProps>
export type BadgeCProps = ConfigurableProps<BadgeProps, 'viewer'>
