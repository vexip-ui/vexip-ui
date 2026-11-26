import { buildProps } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
export type ObjectFitValue = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
export type ObjectFitPosition =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'center'
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right'
  | (string & {})

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
    type: String as PropType<ObjectFitValue>,
    values: ['contain', 'cover', 'fill', 'none', 'scale-down'],
    default: 'none',
  },
  scaleDisabled: {
    type: Boolean,
    default: false,
  },
  position: {
    type: String as PropType<ObjectFitPosition>,
    default: 'center',
  },
})

export type ObjectFitProps = ExtractPropTypes<typeof objectFitProps>
export type ObjectFitCProps = ConfigurableProps<ObjectFitProps>
