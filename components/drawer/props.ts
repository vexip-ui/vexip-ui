import {
  booleanProp,
  booleanStringProp,
  buildProps,
  classProp,
  eventProp,
  localeProp
} from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { DrawerPlacement } from './symbol'

export const drawerProps = buildProps({
  locale: localeProp('drawer'),
  transfer: booleanStringProp,
  active: booleanProp,
  width: [Number, String],
  height: [Number, String],
  placement: String as PropType<DrawerPlacement>,
  title: String,
  closable: booleanProp,
  inner: booleanProp,
  maskClose: booleanProp,
  drawerClass: classProp,
  hideMask: booleanProp,
  onBeforeClose: Function as PropType<(isConfirm?: boolean) => any>,
  resizable: booleanProp,
  autoRemove: booleanProp,
  footer: booleanProp,
  confirmText: String,
  cancelText: String,
  loading: booleanProp,
  onToggle: eventProp<(active: boolean) => void>(),
  onClose: eventProp(),
  onShow: eventProp(),
  onHide: eventProp(),
  onResizeStart: eventProp<(rect: { width: number, height: number }) => void>(),
  onResizeMove: eventProp<(rect: { width: number, height: number }) => void>(),
  onResizeEnd: eventProp<(rect: { width: number, height: number }) => void>(),
  onConfirm: eventProp(),
  onCancel: eventProp()
})

export type DrawerProps = ExtractPropTypes<typeof drawerProps>
export type DrawerCProps = ConfigurableProps<DrawerProps, never, 'onBeforeClose'>
