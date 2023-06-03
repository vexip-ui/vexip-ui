import { booleanProp, buildProps, eventProp, wrapProps } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
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

export const anchorLinkProps = wrapProps({
  to: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  children: {
    type: Array as PropType<AnchorLinkOptions[]>,
    default: () => []
  }
})

export type AnchorLinkProps = ExtractPropTypes<typeof anchorLinkProps>
