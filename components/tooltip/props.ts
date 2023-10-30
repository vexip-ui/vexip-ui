import {
  booleanProp,
  booleanStringProp,
  buildProps,
  classProp,
  eventProp,
  styleProp
} from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { Placement } from '@vexip-ui/hooks'
import type { TooltipShift, TooltipTrigger, TooltipVirtual } from './symbol'

export const tooltipProps = buildProps({
  trigger: String as PropType<TooltipTrigger>,
  wrapper: booleanStringProp,
  noArrow: booleanProp,
  transitionName: String,
  visible: booleanProp,
  placement: String as PropType<Placement>,
  outsideClose: booleanProp,
  noHover: booleanProp,
  tipClass: classProp,
  tipStyle: styleProp,
  transfer: booleanStringProp,
  disabled: booleanProp,
  raw: booleanProp,
  delay: [Number, Array] as PropType<number | number[]>,
  tipAlive: booleanProp,
  reverse: booleanProp,
  width: [String, Number] as PropType<number | 'trigger' | 'auto'>,
  virtual: Object as PropType<TooltipVirtual>,
  shift: {
    type: [Boolean, String] as PropType<boolean | TooltipShift>,
    default: null
  },
  onToggle: eventProp<(visible: boolean) => void>(),
  onTipEnter: eventProp(),
  onTipLeave: eventProp(),
  onClickOutside: eventProp(),
  onOutsideClose: eventProp()
})

export type TooltipProps = ExtractPropTypes<typeof tooltipProps>
export type TooltipCProps = ConfigurableProps<TooltipProps>
