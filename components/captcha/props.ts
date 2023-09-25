import { booleanProp, buildProps, eventProp, sizeProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { IconEffect } from '@/components/icon'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { CaptchaType } from './symbol'

export const captchaProps = buildProps({
  type: String as PropType<CaptchaType>,
  slideTarget: [Number, Array] as PropType<number | number[]>,
  title: String,
  tip: String,
  successTip: String,
  image: String,
  tolerance: Number,
  canvasSize: Array as PropType<number[]>,
  refreshIcon: Object,
  disabled: booleanProp,
  loading: booleanProp,
  loadingIcon: Object,
  loadingLock: booleanProp,
  loadingEffect: String as PropType<IconEffect>,
  onBeforeTest: Function as PropType<(percent: number, matched: boolean) => unknown>,
  onSuccess: eventProp<(percent: number) => void>(),
  onFail: eventProp(),
  onDragStart: eventProp<(percent: number) => void>(),
  onDrag: eventProp<(percent: number) => void>(),
  onDragEnd: eventProp<(percent: number) => void>(),
  onRefresh: eventProp()
})

export type CaptchaProps = ExtractPropTypes<typeof captchaProps>
export type CaptchaCProps = ConfigurableProps<ExtractPropTypes<typeof captchaProps>>

export const captchaSliderProps = buildProps({
  size: sizeProp,
  target: Number,
  tip: String,
  successTip: String,
  tolerance: Number,
  disabled: booleanProp,
  loading: booleanProp,
  loadingIcon: Object,
  loadingLock: booleanProp,
  loadingEffect: String as PropType<IconEffect>,
  onBeforeTest: Function as PropType<(percent: number, matched: boolean) => unknown>,
  onSuccess: eventProp<(percent: number) => void>(),
  onFail: eventProp(),
  onDragStart: eventProp<(percent: number) => void>(),
  onDrag: eventProp<(percent: number) => void>(),
  onDragEnd: eventProp<(percent: number) => void>()
})

export type CaptchaSliderProps = ExtractPropTypes<typeof captchaSliderProps>
export type CaptchaSliderCProps = ConfigurableProps<ExtractPropTypes<typeof captchaSliderProps>>
