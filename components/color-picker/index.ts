import ColorPicker from './color-picker.vue'

export { ColorPicker }
export { colorPickerProps } from './props'

export type ColorPickerExposed = InstanceType<typeof ColorPicker>

export type { Color } from '@vexip-ui/utils'
export type { ColorPickerProps, ColorPickerCProps } from './props'
