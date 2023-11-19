import { booleanProp, buildProps, classProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { Placement } from '@vexip-ui/hooks'
import type { TooltipShift, TooltipTheme } from '@/components/tooltip'

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
  tipMaxWidth: [Number, String],
  tipDisabled: booleanProp,
  tipShift: {
    type: [Boolean, String] as PropType<boolean | TooltipShift>,
    default: null
  }
})

export type EllipsisProps = ExtractPropTypes<typeof ellipsisProps>
export type EllipsisCProps = ConfigurableProps<EllipsisProps>
