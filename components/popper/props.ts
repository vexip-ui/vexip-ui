import { booleanProp, buildProps, eventProp } from '@vexip-ui/config'

import type { ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const popperProps = buildProps({
  visible: booleanProp,
  alive: booleanProp,
  to: String,
  transition: String,
  appear: booleanProp,
  role: String,
  onBeforeEnter: eventProp<(el: Element) => void>(),
  onEnter: eventProp<(el: Element) => void>(),
  onAfterEnter: eventProp<(el: Element) => void>(),
  onEnterCancelled: eventProp<(el: Element) => void>(),
  onBeforeLeave: eventProp<(el: Element) => void>(),
  onLeave: eventProp<(el: Element) => void>(),
  onAfterLeave: eventProp<(el: Element) => void>(),
  onLeaveCancelled: eventProp<(el: Element) => void>(),
})

export type PopperProps = ExtractPropTypes<typeof popperProps>
export type PopperCProps = ConfigurableProps<PopperProps>
