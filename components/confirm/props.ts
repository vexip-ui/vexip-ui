import { booleanProp, buildProps, classProp, localeProp, styleProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { IconMinorProps } from '@/components/icon'
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
  icon: {
    type: [Boolean, Object, Function] as PropType<boolean | Record<string, any> | (() => any)>,
    default: null
  },
  className: classProp,
  style: styleProp,
  renderer: Function as PropType<ConfirmRenderFn>,
  iconProps: Object as PropType<IconMinorProps>,
  closable: booleanProp,
  contentAlign: String as PropType<ConfirmAlign>,
  actionsAlign: String as PropType<ConfirmAlign>,
  parseHtml: booleanProp
})

export type ConfirmProps = ExtractPropTypes<typeof confirmProps>
export type ConfirmCProps = ConfigurableProps<ConfirmProps>
