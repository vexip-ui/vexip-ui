import { booleanProp, buildProps, eventProp, sizeProp, stateProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { CaptchaType } from './symbol'

export const captchaProps = buildProps({
  state: stateProp,
  type: String as PropType<CaptchaType>,
  loading: booleanProp,
  slideTarget: [Number, Array] as PropType<number | number[]>,
  title: String,
  tip: String,
  successTip: String,
  image: String,
  tolerance: Number,
  canvasSize: Array as PropType<number[]>,
  refreshIcon: Object,
  disabled: booleanProp,
  onBeforeTest: Function as PropType<(checked: boolean) => unknown>,
  onSuccess: eventProp(),
  onFail: eventProp(),
  onRefresh: eventProp()
})

export type CaptchaProps = ExtractPropTypes<typeof captchaProps>
export type CaptchaCProps = ConfigurableProps<ExtractPropTypes<typeof captchaProps>>

export const captchaSliderProps = buildProps({
  size: sizeProp,
  state: stateProp,
  loading: booleanProp,
  target: Number,
  tip: String,
  successTip: String,
  tolerance: Number,
  refreshIcon: Object,
  disabled: booleanProp,
  onBeforeTest: Function as PropType<(checked: boolean) => unknown>,
  onToggle: eventProp<(visible: boolean) => void>(),
  onSuccess: eventProp(),
  onFail: eventProp(),
  onRefresh: eventProp(),
  onClickOutside: eventProp(),
  onOutsideClose: eventProp()
})

export type CaptchaSliderProps = ExtractPropTypes<typeof captchaSliderProps>
export type CaptchaSliderCProps = ConfigurableProps<ExtractPropTypes<typeof captchaSliderProps>>
