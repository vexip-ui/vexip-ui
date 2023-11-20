import {
  booleanNumberProp,
  booleanProp,
  buildProps,
  classProp,
  eventProp,
  styleProp
} from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { BarScrollPayload } from '@/components/scroll'
import type { NativeScrollMode, NativeScrollPayload } from './symbol'

export const nativeScrollProps = buildProps({
  scrollClass: classProp,
  scrollStyle: styleProp,
  scrollAttrs: Object as PropType<Record<string, any>>,
  mode: String as PropType<NativeScrollMode>,
  width: [Number, String],
  height: [Number, String],
  disabled: booleanProp,
  pointer: booleanProp,
  scrollX: Number,
  scrollY: Number,
  useXBar: booleanProp,
  useYBar: booleanProp,
  barFade: Number,
  barClass: classProp,
  autoplay: booleanNumberProp,
  playWaiting: Number,
  appear: booleanProp,
  barDuration: Number,
  useBarTrack: booleanProp,
  scrollTag: String,
  observeDeep: booleanProp,
  scrollOnly: booleanProp,
  onResize: eventProp<(entry: ResizeObserverEntry) => void>(),
  onXEnabledChange: eventProp<(enabled: boolean) => void>(),
  onYEnabledChange: eventProp<(enabled: boolean) => void>(),
  onWheel: eventProp<(event: WheelEvent, type: 'vertical' | 'horizontal') => void>(),
  onScrollStart: eventProp<(payload: Omit<NativeScrollPayload, 'type'>) => void>(),
  onScroll: eventProp<(payload: NativeScrollPayload) => void>(),
  onScrollEnd: eventProp<(payload: Omit<NativeScrollPayload, 'type'>) => void>(),
  onBarScrollStart: eventProp<(payload: BarScrollPayload) => void>(),
  onBarScroll: eventProp<(payload: BarScrollPayload) => void>(),
  onBarScrollEnd: eventProp<(payload: BarScrollPayload) => void>()
})

export type NativeScrollProps = ExtractPropTypes<typeof nativeScrollProps>
export type NativeScrollCProps = ConfigurableProps<
  NativeScrollProps,
  'scrollX' | 'scrollY',
  'onBeforeScroll'
>
