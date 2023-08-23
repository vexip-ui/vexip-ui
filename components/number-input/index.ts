import NumberInput from './number-input.vue'

import type { ComponentPublicInstance } from 'vue'

export { NumberInput }
export { numberInputProps } from './props'

export type NumberInputExposed = ComponentPublicInstance & InstanceType<typeof NumberInput>

export type { NumberInputProps, NumberInputCProps } from './props'
export type { NumberInputControlType, NumberInputEmptyType } from './symbol'
