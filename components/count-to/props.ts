import { buildProps } from '@vexip-ui/config'
import type { ExtractPropTypes, PropType } from 'vue'

export type EasingFn = (t: number, b: number, c: number, d: number) => number

export const countToProps = buildProps({
  start: Number,
  end: Number,
  duration: Number,
  autoplay: Boolean,
  decimals: Number,
  decimal: String,
  separator: String,
  prefix: String,
  suffix: String,
  useEasing: Boolean,
  easingFn: Function as PropType<EasingFn>
})

export type CountToProps = ExtractPropTypes<typeof countToProps>
