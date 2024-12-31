import ColorPicker from './color-picker.vue'

import type { ComponentPublicInstance } from 'vue'

export { ColorPicker }
export { colorPickerProps } from './props'

export type ColorPickerExposed = ComponentPublicInstance & InstanceType<typeof ColorPicker>

export type { Color } from '@vexip-ui/utils'
export type { ColorPickerProps, ColorPickerCProps } from './props'
export type { ColorFormat, ColorPrickerSlots } from './symbol'
