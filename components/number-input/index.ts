import NumberInput from './number-input.vue'

export { NumberInput }
export { numberInputProps } from './props'

export type NumberInputExposed = InstanceType<typeof NumberInput>

export type { NumberInputProps, NumberInputCProps } from './props'
export type { NumberInputControlType, NumberInputEmptyType } from './symbol'
