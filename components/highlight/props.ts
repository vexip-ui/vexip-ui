import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const highlightProps = buildProps({
  //
})

export type HighlightProps = ExtractPropTypes<typeof highlightProps>
export type HighlightCProps = ConfigurableProps<HighlightProps, 'viewer'>
