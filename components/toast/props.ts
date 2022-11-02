import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const toastProps = buildProps({
  //
})

export type ToastProps = ExtractPropTypes<typeof toastProps>
export type ToastCProps = ConfigurableProps<ToastProps, 'viewer'>
