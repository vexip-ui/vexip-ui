import { booleanProp, buildProps, classProp, localeProp, styleProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { ConfirmAlign, ConfirmButtonType, ConfirmRenderFn } from './symbol'

const positionType = [Number, String]

export const confirmProps = buildProps({
  locale: localeProp('confirm'),
  top: positionType,
  left: positionType,
  width: positionType,
  maskClose: booleanProp,
  confirmType: String as PropType<ConfirmButtonType>,
  cancelType: String as PropType<ConfirmButtonType>,
  confirmText: String,
  cancelText: String,
  icon: [Object, Function] as PropType<Record<string, any> | (() => any)>,
  className: classProp,
  style: styleProp,
  renderer: Function as PropType<ConfirmRenderFn>,
  iconColor: String,
  closable: booleanProp,
  contentAlign: String as PropType<ConfirmAlign>,
  actionsAlign: String as PropType<ConfirmAlign>,
  parseHtml: booleanProp
})

export type ConfirmProps = ExtractPropTypes<typeof confirmProps>
export type ConfirmCProps = ConfigurableProps<ConfirmProps>
