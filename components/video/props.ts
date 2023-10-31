import { booleanProp, buildProps, eventProp } from '@vexip-ui/config'

import type { ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const videoProps = buildProps({
  noControls: booleanProp,
  videoAttrs: Object,
  onCanplay: eventProp<(event: Event) => void>()
})

export type VideoProps = ExtractPropTypes<typeof videoProps>
export type VideoCProps = ConfigurableProps<ExtractPropTypes<typeof videoProps>>
