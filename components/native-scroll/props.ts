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
import type { BarScrollPayload, NativeScrollMode, ScrollPayload } from './symbol'

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
  onBeforeScroll: Function as PropType<(payload: { signX: number, signY: number }) => boolean>,
  appear: booleanProp,
  barDuration: Number,
  useBarTrack: booleanProp,
  scrollTag: String,
  onResize: eventProp<(entry: ResizeObserverEntry) => void>(),
  onXEnabledChange: eventProp<(enabled: boolean) => void>(),
  onYEnabledChange: eventProp<(enabled: boolean) => void>(),
  onWheel: eventProp<(event: WheelEvent, type: 'vertical' | 'horizontal') => void>(),
  onScrollStart: eventProp<(payload: Omit<ScrollPayload, 'type'>) => void>(),
  onScroll: eventProp<(payload: ScrollPayload) => void>(),
  onScrollEnd: eventProp<(payload: Omit<ScrollPayload, 'type'>) => void>(),
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
