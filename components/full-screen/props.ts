import type { ExtractPropTypes } from 'vue'
import { buildProps } from '@vexip-ui/config'

export type FullScreenProps = ExtractPropTypes<typeof fullScreenProps>

export const fullScreenProps = buildProps({
  zIndex: Number
})
