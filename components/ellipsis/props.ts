import { buildProps, booleanProp, classProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { Placement } from '@vexip-ui/hooks'
import type { TooltipTheme } from '@/components/tooltip'

export const ellipsisProps = buildProps({
  placement: String as PropType<Placement>,
  transfer: {
    type: [String, Boolean],
    default: null
  },
  noHover: booleanProp,
  transitionName: String,
  tooltipTheme: String as PropType<TooltipTheme>,
  tipClass: classProp,
  maxLines: Number,
  tipMaxWidth: [Number, String]
})

export type EllipsisProps = ExtractPropTypes<typeof ellipsisProps>
export type EllipsisCProps = ConfigurableProps<EllipsisProps>
