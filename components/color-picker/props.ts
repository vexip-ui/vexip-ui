import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const colorPickerProps = buildProps({
  //
})

export type ColorPickerProps = ExtractPropTypes<typeof colorPickerProps>
export type ColorPickerCProps = ConfigurableProps<ColorPickerProps, 'viewer'>
