import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const formProps = buildProps({
  //
})

export type FormProps = ExtractPropTypes<typeof formProps>
export type FormCProps = ConfigurableProps<FormProps, 'viewer'>
