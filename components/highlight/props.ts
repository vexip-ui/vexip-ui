import { booleanProp, buildProps } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const highlightProps = buildProps({
  content: String,
  keyWords: Array as PropType<string[]>,
  ignoreCase: booleanProp
})

export type HighlightProps = ExtractPropTypes<typeof highlightProps>
export type HighlightCProps = ConfigurableProps<HighlightProps, 'content' | 'keyWords'>
