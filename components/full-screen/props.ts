import { buildProps, eventProp } from '@vexip-ui/config'

import type { ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { FullScreenType } from './symbol'

export const fullScreenProps = buildProps({
  tag: String,
  onToggle: eventProp<(full: false | FullScreenType) => void>(),
})

export type FullScreenProps = ExtractPropTypes<typeof fullScreenProps>
export type FullScreenCProps = ConfigurableProps<FullScreenProps, 'model'>
