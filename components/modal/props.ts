import {
  buildProps,
  booleanProp,
  booleanStringProp,
  classProp,
  styleProp,
  eventProp
} from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

const positionType = [Number, String]

export const modalProps = buildProps({
  transfer: booleanStringProp,
  active: booleanProp,
  width: positionType,
  height: positionType,
  top: positionType,
  left: positionType,
  right: positionType,
  bottom: positionType,
  title: String,
  closable: booleanProp,
  inner: booleanProp,
  maskClose: booleanProp,
  modalClass: classProp,
  modalStyle: styleProp,
  noFooter: booleanProp,
  hideMask: booleanProp,
  draggable: booleanProp,
  resizable: booleanProp,
  onBeforeClose: Function as PropType<(isConfirm: boolean) => any>,
  loading: booleanProp,
  minWidth: Number,
  minHeight: Number,
  transitionName: String,
  confirmText: String,
  cancelText: String,
  autoRemove: booleanProp,
  onToggle: eventProp<(active: boolean) => void>(),
  onConfirm: eventProp(),
  onCancel: eventProp(),
  onClose: eventProp(),
  onShow: eventProp(),
  onHide: eventProp(),
  onDragStart: eventProp<(position: { top: number, left: number }) => void>(),
  onDragMove: eventProp<(position: { top: number, left: number }) => void>(),
  onDragEnd: eventProp<(position: { top: number, left: number }) => void>(),
  onResizeStart: eventProp<(rect: { width: number, height: number }) => void>(),
  onResizeMove: eventProp<(rect: { width: number, height: number }) => void>(),
  onResizeEnd: eventProp<(rect: { width: number, height: number }) => void>()
})

export type ModalProps = ExtractPropTypes<typeof modalProps>
export type ModalCProps = ConfigurableProps<ModalProps, never, 'onBeforeClose'>
