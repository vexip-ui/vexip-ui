import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const breadcrumbProps = buildProps({
  //
})

export type BreadcrumbProps = ExtractPropTypes<typeof breadcrumbProps>
export type BreadcrumbCProps = ConfigurableProps<BreadcrumbProps, 'viewer'>
