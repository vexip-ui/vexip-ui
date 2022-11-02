import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const rendererProps = buildProps({
  //
})

export type RendererProps = ExtractPropTypes<typeof rendererProps>
export type RendererCProps = ConfigurableProps<RendererProps, 'viewer'>
