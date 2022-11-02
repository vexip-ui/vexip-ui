import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const popupProps = buildProps({
  //
})

export type PopupProps = ExtractPropTypes<typeof popupProps>
export type PopupCProps = ConfigurableProps<PopupProps, 'viewer'>
