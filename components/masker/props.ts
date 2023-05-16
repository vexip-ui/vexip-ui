import { booleanProp, booleanStringProp, buildProps, eventProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const maskerProps = buildProps({
  active: booleanProp,
  closable: booleanProp,
  inner: booleanProp,
  maskTransition: String,
  transitionName: String,
  disabled: booleanProp,
  onBeforeClose: Function as PropType<() => any | Promise<any>>,
  transfer: booleanStringProp,
  autoRemove: booleanProp,
  onToggle: eventProp<(active: boolean) => void>(),
  onClose: eventProp(),
  onHide: eventProp(),
  onShow: eventProp()
})

export type MaskerProps = ExtractPropTypes<typeof maskerProps>
export type MaskerCProps = ConfigurableProps<MaskerProps, never, 'onBeforeClose'>
