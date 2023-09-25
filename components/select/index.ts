import Select from './select.vue'

import type { ComponentPublicInstance } from 'vue'

export { Select }
export { selectProps } from './props'

export type SelectExposed = ComponentPublicInstance & InstanceType<typeof Select>

export type { SelectProps, SelectCProps } from './props'
export type {
  SelectKeyConfig,
  SelectRawOption,
  SelectBaseValue,
  SelectValue,
  SelectOptionState,
  SelectFilter
} from './symbol'
