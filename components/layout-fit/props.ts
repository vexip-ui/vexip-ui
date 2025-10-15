import { buildProps, eventProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { ResizeObserverEntry } from '@juggle/resize-observer'

export const layoutFitProps = buildProps({
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
    default: false,
  },
  onResize:
    eventProp<
      (data: {
        contentWidth: number,
        contentHeight: number,
        scaleX: number,
        scaleY: number,
        innerWidth: number,
        innerHeight: number,
        _entries: ResizeObserverEntry[],
      }) => void
    >(),
})

export type LayoutFitProps = ExtractPropTypes<typeof layoutFitProps>
export type LayoutFitCProps = ConfigurableProps<LayoutFitProps>
