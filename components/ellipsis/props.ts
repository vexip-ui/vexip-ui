import { booleanProp, booleanStringProp, buildProps, classProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { Placement } from '@vexip-ui/hooks'
import type { TooltipShift, TooltipTheme } from '@/components/tooltip'
import type { EllipsisSlots } from './symbol'

export const ellipsisProps = buildProps({
  placement: String as PropType<Placement>,
  transfer: booleanStringProp,
  noHover: booleanProp,
  transitionName: String,
  tooltipTheme: String as PropType<TooltipTheme>,
  tipClass: classProp,
  maxLines: Number,
  tipMaxWidth: [Number, String],
  tipDisabled: booleanProp,
  tipShift: {
    type: [Boolean, String] as PropType<boolean | TooltipShift>,
    default: null,
  },
  slots: Object as PropType<EllipsisSlots>,
})

export type EllipsisProps = ExtractPropTypes<typeof ellipsisProps>
export type EllipsisCProps = ConfigurableProps<EllipsisProps>
