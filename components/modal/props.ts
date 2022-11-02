import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const modalProps = buildProps({
  //
})

export type ModalProps = ExtractPropTypes<typeof modalProps>
export type ModalCProps = ConfigurableProps<ModalProps, 'viewer'>
