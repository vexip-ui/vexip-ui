import { buildProps, booleanNumberProp, eventProp } from '@vexip-ui/config'

import type { ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const resizeObserverProps = buildProps({
  throttle: booleanNumberProp,
  onResize: eventProp<(entry: ResizeObserverEntry) => void>()
})

export type ResizeObserverProps = ExtractPropTypes<typeof resizeObserverProps>
export type ResizeObserverCProps = ConfigurableProps<ResizeObserverProps>
