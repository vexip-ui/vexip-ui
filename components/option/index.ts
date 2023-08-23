import Option from './option.vue'

import type { ComponentPublicInstance } from 'vue'

export { Option }
export { optionProps } from './props'

export type OptionExposed = ComponentPublicInstance & InstanceType<typeof Option>

export type { OptionProps } from './props'
export type { OptionKeyConfig, RawOption, OptionState } from './symbol'
