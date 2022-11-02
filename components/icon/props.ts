import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const iconProps = buildProps({
  //
})

export type IconProps = ExtractPropTypes<typeof iconProps>
export type IconCProps = ConfigurableProps<IconProps, 'viewer'>
