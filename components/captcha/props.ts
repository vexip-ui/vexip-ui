import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { CaptchaType } from './symbol'

export const captchaProps = buildProps({
  type: String as PropType<CaptchaType>,
  loading: booleanProp,
  slideTarget: Number,
  tip: String,
  successTip: String,
  image: String,
  onBeforeTest: Function as PropType<(checked: boolean) => unknown>,
  onSuccess: eventProp(),
  onFail: eventProp()
})

export type CaptchaProps = ExtractPropTypes<typeof captchaProps>
export type CaptchaCProps = ConfigurableProps<ExtractPropTypes<typeof captchaProps>>
