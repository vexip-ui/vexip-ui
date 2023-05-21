import { booleanProp, buildProps, classProp, eventProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { IconEffect } from '@/components/icon'
import type { ConfigurableProps } from '@vexip-ui/config'

export const spinProps = buildProps({
  active: booleanProp,
  icon: Object,
  spin: booleanProp,
  inner: booleanProp,
  delay: {
    type: [Boolean, Number, Array] as PropType<boolean | number | number[]>,
    default: null
  },
  tip: String,
  hideMask: booleanProp,
  maskColor: String,
  maskClass: classProp,
  transitionName: String,
  iconEffect: String as PropType<IconEffect>,
  onMaskClick: eventProp<(event: MouseEvent) => void>(),
  onShow: eventProp(),
  onHide: eventProp()
})

export type SpinProps = ExtractPropTypes<typeof spinProps>
export type SpinCProps = ConfigurableProps<SpinProps>
