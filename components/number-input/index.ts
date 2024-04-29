import NumberInput from './number-input.vue'

import type { ComponentPublicInstance } from 'vue'

export { NumberInput }
export { numberInputProps } from './props'
export { useNumberInput } from './hooks'

export type NumberInputExposed = ComponentPublicInstance & InstanceType<typeof NumberInput>

export type { NumberInputProps, NumberInputCProps } from './props'
export type { HookNumberInputProps, HookNumberInputRefs } from './hooks'
export type { NumberInputControlType, NumberInputEmptyType } from './symbol'
