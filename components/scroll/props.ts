import { buildProps, booleanProp, booleanNumberProp, classProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { ScrollMode, ScrollPayload, BarScrollPayload } from './symbol'

export const scrollProps = buildProps({
  scrollClass: classProp,
  scrollAttrs: Object as PropType<Record<string, any>>,
  mode: String as PropType<ScrollMode>,
  width: [Number, String],
  height: [Number, String],
  deltaX: Number,
  deltaY: Number,
  disabled: booleanProp,
  pointer: booleanProp,
  wheel: booleanProp,
  scrollX: Number,
  scrollY: Number,
  useXBar: booleanProp,
  useYBar: booleanProp,
  barFade: Number,
  barClass: classProp,
  autoplay: booleanNumberProp,
  playWaiting: Number,
  noBuffer: booleanProp,
  noTransition: booleanProp,
  onBeforeScroll: Function as PropType<(payload: { signX: number, signY: number }) => boolean>,
  useBarTrack: booleanProp,
  wrapperTag: String,
  onResize: eventProp<(entry: ResizeObserverEntry) => void>(),
  onXEnabledChange: eventProp<(enabled: boolean) => void>(),
  onYEnabledChange: eventProp<(enabled: boolean) => void>(),
  onWheel: eventProp<(payload: BarScrollPayload & { sign: 1 | -1 }) => void>(),
  onScrollStart: eventProp<(payload: Omit<ScrollPayload, 'type'>) => void>(),
  onScroll: eventProp<(payload: ScrollPayload) => void>(),
  onScrollEnd: eventProp<(payload: Omit<ScrollPayload, 'type'>) => void>(),
  onBarScrollStart: eventProp<(payload: BarScrollPayload) => void>(),
  onBarScroll: eventProp<(payload: BarScrollPayload) => void>(),
  onBarScrollEnd: eventProp<(payload: BarScrollPayload) => void>(),
  onReady: eventProp()
})

export type ScrollProps = ExtractPropTypes<typeof scrollProps>
export type ScrollCProps = ConfigurableProps<ScrollProps, 'scrollX' | 'scrollY', 'onBeforeScroll'>
