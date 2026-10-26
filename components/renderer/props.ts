import { wrapProps } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'

export const rendererProps = wrapProps({
  renderer: {
    type: Function,
    default: null,
  },
  data: {
    type: Object as PropType<Record<string, any>>,
    default: undefined,
  },
})

export type RendererProps = ExtractPropTypes<typeof rendererProps>
