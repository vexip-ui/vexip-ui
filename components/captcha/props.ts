import {
  booleanProp,
  booleanStringProp,
  buildProps,
  eventProp,
  iconProp,
  sizeProp,
} from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { IconEffect } from '@/components/icon'
import type { ConfigurableProps, EventListener } from '@vexip-ui/config'
import type { CaptchaHollowProcess, CaptchaHollowType } from './hollow-paths'
import type {
  CaptchaBeforeTest,
  CaptchaSliderSlots,
  CaptchaSlots,
  CaptchaType,
  SuccessEvent,
} from './symbol'

export const captchaProps = buildProps({
  type: String as PropType<CaptchaType>,
  slideTarget: [Number, Array] as PropType<number | number[]>,
  title: String,
  tip: String,
  successTip: String,
  failTip: String,
  image: [String, Function] as PropType<string | (() => Promise<string>)>,
  tolerance: Number,
  canvasSize: Array as PropType<number[]>,
  refreshIcon: iconProp,
  disabled: booleanProp,
  loading: booleanProp,
  loadingIcon: iconProp,
  loadingEffect: String as PropType<IconEffect>,
  onBeforeTest: Function as PropType<CaptchaBeforeTest>,
  texts: Array as PropType<string[]>,
  failLimit: Number,
  remotePoint: booleanProp,
  useTrigger: booleanProp,
  triggerSize: sizeProp,
  triggerText: String,
  transfer: booleanStringProp,
  hideDelay: Number,
  hollowShape: [String, Function] as PropType<CaptchaHollowType | CaptchaHollowProcess>,
  slots: Object as PropType<CaptchaSlots>,
  onSuccess: eventProp<EventListener<SuccessEvent>>(),
  onFail: eventProp(),
  onDragStart: eventProp<(percent: number) => void>(),
  onDrag: eventProp<(percent: number) => void>(),
  onDragEnd: eventProp<(percent: number) => void>(),
  onRefresh: eventProp(),
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
  loadingIcon: iconProp,
  loadingLock: booleanProp,
  loadingEffect: String as PropType<IconEffect>,
  onBeforeTest: Function as PropType<(percent: number, matched: boolean) => unknown>,
  slots: Object as PropType<CaptchaSliderSlots>,
  onSuccess: eventProp<(percent: number) => void>(),
  onFail: eventProp(),
  onDragStart: eventProp<(percent: number) => void>(),
  onDrag: eventProp<(percent: number) => void>(),
  onDragEnd: eventProp<(percent: number) => void>(),
})

export type CaptchaSliderProps = ExtractPropTypes<typeof captchaSliderProps>
export type CaptchaSliderCProps = ConfigurableProps<ExtractPropTypes<typeof captchaSliderProps>>
