import {
  booleanProp,
  booleanStringProp,
  buildProps,
  classProp,
  eventProp,
  localeProp,
  sizeProp,
  styleProp,
} from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { ButtonType } from '@/components/button'
import type { ModalSlots, PositionPayload, SizePayload } from './symbol'

const positionType = [Number, String]

export const positionValidator = (value: string | number) => {
  return value === 'auto' || !Number.isNaN(parseFloat(value as string))
}
export const positionProp = {
  default: 'auto' as const,
  validator: positionValidator,
}

export const modalProps = buildProps({
  locale: localeProp('modal'),
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
  actionSize: sizeProp,
  autoRemove: booleanProp,
  confirmType: String as PropType<ButtonType>,
  cancelType: String as PropType<ButtonType>,
  undivided: booleanProp,
  xOffset: positionType,
  yOffset: positionType,
  disableEsc: booleanProp,
  slots: Object as PropType<ModalSlots>,
  onToggle: eventProp<(active: boolean) => void>(),
  onConfirm: eventProp(),
  onCancel: eventProp(),
  onClose: eventProp(),
  onShow: eventProp(),
  onHide: eventProp(),
  onDragStart: eventProp<(position: PositionPayload) => void>(),
  onDragMove: eventProp<(position: PositionPayload) => void>(),
  onDragEnd: eventProp<(position: PositionPayload) => void>(),
  onResizeStart: eventProp<(size: SizePayload) => void>(),
  onResizeMove: eventProp<(size: SizePayload) => void>(),
  onResizeEnd: eventProp<(size: SizePayload) => void>(),
})

export type ModalProps = ExtractPropTypes<typeof modalProps>
export type ModalCProps = ConfigurableProps<ModalProps, never, 'onBeforeClose'>
