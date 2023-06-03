import Option from './option.vue'

export { Option }
export { optionProps } from './props'

export type OptionExposed = InstanceType<typeof Option>
export type { OptionProps } from './props'
export type { OptionKeyConfig, RawOption, OptionState } from './symbol'
