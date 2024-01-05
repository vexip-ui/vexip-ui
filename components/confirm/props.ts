import { booleanProp, buildProps, classProp, localeProp, styleProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { IconMinorProps } from '@/components/icon'
import type { ConfirmAlign, ConfirmButtonType, ConfirmRenderFn } from './symbol'

const positionType = [Number, String]

export const confirmProps = buildProps({
  locale: localeProp('confirm'),
  width: positionType,
  height: positionType,
  top: positionType,
  left: positionType,
  right: positionType,
  bottom: positionType,
  maskClose: booleanProp,
  confirmType: String as PropType<ConfirmButtonType>,
  cancelType: String as PropType<ConfirmButtonType>,
  confirmText: String,
  cancelText: String,
  icon: {
    type: [Boolean, Object, Function],
    default: null
  },
  className: classProp,
  style: styleProp,
  renderer: Function as PropType<ConfirmRenderFn>,
  iconProps: Object as PropType<IconMinorProps>,
  closable: booleanProp,
  contentAlign: String as PropType<ConfirmAlign>,
  actionsAlign: String as PropType<ConfirmAlign>,
  parseHtml: booleanProp,
  cancelable: booleanProp,
  xOffset: positionType,
  yOffset: positionType
})

export type ConfirmProps = ExtractPropTypes<typeof confirmProps>
export type ConfirmCProps = ConfigurableProps<ConfirmProps>
