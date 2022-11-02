import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const confirmProps = buildProps({
  //
})

export type ConfirmProps = ExtractPropTypes<typeof confirmProps>
export type ConfirmCProps = ConfigurableProps<ConfirmProps, 'viewer'>
