import { buildProps } from '@vexip-ui/config'

import type { ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const fullScreenProps = buildProps({
  tag: String
})

export type FullScreenProps = ExtractPropTypes<typeof fullScreenProps>
export type FullScreenCProps = ConfigurableProps<FullScreenProps, 'model'>
