import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const tooltipProps = buildProps({
  //
})

export type TooltipProps = ExtractPropTypes<typeof tooltipProps>
export type TooltipCProps = ConfigurableProps<TooltipProps, 'viewer'>
