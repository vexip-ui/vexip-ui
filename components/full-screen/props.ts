import { buildProps } from '@vexip-ui/config'
import type { PropType, ExtractPropTypes } from 'vue'

export type FullScreenType = 'window' | 'browser'

export type FullScreenProps = ExtractPropTypes<typeof fullScreenProps>

export const fullScreenProps = buildProps({
  type: String as PropType<FullScreenType>
})

export const fullScreenTypeProps: FullScreenType[] = ['window', 'browser']
