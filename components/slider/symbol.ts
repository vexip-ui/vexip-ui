import type { ClassType, StyleType } from '@vexip-ui/config'

export interface SliderMarker {
  label?: string,
  class?: ClassType,
  style?: StyleType,
  attrs?: Record<string, any>
}
