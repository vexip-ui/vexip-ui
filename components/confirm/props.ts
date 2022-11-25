import { buildProps, booleanProp, classProp, styleProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { ConfirmType, ConfirmAlign, ConfirmRenderFn } from './symbol'

const positionType = [Number, String]

export const confirmProps = buildProps({
  top: positionType,
  left: positionType,
  width: positionType,
  maskClose: booleanProp,
  confirmType: String as PropType<ConfirmType>,
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
