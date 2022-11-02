import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const textareaProps = buildProps({
  //
})

export type TextareaProps = ExtractPropTypes<typeof textareaProps>
export type TextareaCProps = ConfigurableProps<TextareaProps, 'viewer'>
