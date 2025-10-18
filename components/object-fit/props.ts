import { buildProps } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const objectFitProps = buildProps({
  width: {
    type: Number,
    default: 100,
  },
  height: {
    type: Number,
    default: 100,
  },
  fit: {
    type: String as PropType<'contain' | 'cover' | 'fill' | 'none' | 'scale-down'>,
    values: ['contain', 'cover', 'fill', 'none', 'scale-down'],
    default: 'none',
  },
  isScale: {
    type: Boolean,
    default: true,
  },
  position: {
    type: String,
    default: 'center',
  },
})

export type ObjectFitProps = ExtractPropTypes<typeof objectFitProps>
export type ObjectFitCProps = ConfigurableProps<ObjectFitProps>
