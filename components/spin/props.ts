import { booleanProp, buildProps, classProp, eventProp, iconProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { IconEffect } from '@/components/icon'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { SpinSlots } from './symbol'

export const spinProps = buildProps({
  active: booleanProp,
  icon: iconProp,
  inner: booleanProp,
  delay: {
    type: [Boolean, Number, Array] as PropType<boolean | number | number[]>,
    default: null,
  },
  tip: String,
  hideMask: booleanProp,
  maskColor: String,
  maskClass: classProp,
  transitionName: String,
  iconEffect: String as PropType<IconEffect>,
  slots: Object as PropType<SpinSlots>,
  onMaskClick: eventProp<(event: MouseEvent) => void>(),
  onShow: eventProp(),
  onHide: eventProp(),
})

export type SpinProps = ExtractPropTypes<typeof spinProps>
export type SpinCProps = ConfigurableProps<SpinProps>
