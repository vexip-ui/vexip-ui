import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const nativeScrollProps = buildProps({
  //
})

export type NativeScrollProps = ExtractPropTypes<typeof nativeScrollProps>
export type NativeScrollCProps = ConfigurableProps<NativeScrollProps, 'viewer'>
