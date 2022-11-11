import { buildProps } from '@/common/config/src/props'
import type { PropType, ExtractPropTypes } from 'vue'

export type FullScreenType = 'window' | 'browser'

export type FullScreenProps = ExtractPropTypes<typeof fullScreenProps>

export const fullScreenProps = buildProps({
  type: {
    type: String as PropType<FullScreenType>,
    default: 'window'
  }
})
