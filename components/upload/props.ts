import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const uploadProps = buildProps({
  //
})

export type UploadProps = ExtractPropTypes<typeof uploadProps>
export type UploadCProps = ConfigurableProps<UploadProps, 'viewer'>
