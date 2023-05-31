import {
  booleanProp,
  booleanStringProp,
  buildProps,
  eventProp,
  sizeProp,
  stateProp
} from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { Placement } from '@vexip-ui/hooks'
import type { CaptchaType } from './symbol'

export const captchaProps = buildProps({
  size: sizeProp,
  state: stateProp,
  type: String as PropType<CaptchaType>,
  visible: booleanProp,
  loading: booleanProp,
  slideTarget: [Number, Array] as PropType<number | number[]>,
  tip: String,
  successTip: String,
  image: String,
  tolerance: Number,
  canvasSize: Array as PropType<number[]>,
  refreshIcon: Object,
  placement: String as PropType<Placement>,
  transfer: booleanStringProp,
  outsideClose: booleanProp,
  disabled: booleanProp,
  onBeforeTest: Function as PropType<(checked: boolean) => unknown>,
  onToggle: eventProp<(visible: boolean) => void>(),
  onSuccess: eventProp(),
  onFail: eventProp(),
  onRefresh: eventProp(),
  onClickOutside: eventProp(),
  onOutsideClose: eventProp()
})

export type CaptchaProps = ExtractPropTypes<typeof captchaProps>
export type CaptchaCProps = ConfigurableProps<ExtractPropTypes<typeof captchaProps>>
