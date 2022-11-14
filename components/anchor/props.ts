import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { AnchorLinkOptions } from './symbol'

export const anchorProps = buildProps({
  active: String,
  viewer: [String, Object, Function] as PropType<unknown>,
  offset: Number,
  marker: booleanProp,
  scrollDuration: Number,
  markerTransition: String,
  options: Array as PropType<AnchorLinkOptions[]>,
  bindHash: booleanProp,
  forceActive: booleanProp,
  onChange: eventProp<(value: string) => void>()
})

export type AnchorProps = ExtractPropTypes<typeof anchorProps>
export type AnchorCProps = ConfigurableProps<AnchorProps, 'viewer'>
