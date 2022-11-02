import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const layoutProps = buildProps({
  //
})

export type LayoutProps = ExtractPropTypes<typeof layoutProps>
export type LayoutCProps = ConfigurableProps<LayoutProps, 'viewer'>
