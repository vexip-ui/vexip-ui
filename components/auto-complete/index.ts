import AutoComplete from './auto-complete.vue'

import type { ComponentPublicInstance } from 'vue'

export { AutoComplete }
export { autoCompleteProps } from './props'

export type AutoCompleteExposed = ComponentPublicInstance & InstanceType<typeof AutoComplete>

export type { AutoCompleteProps, AutoCompleteCProps } from './props'
export type {
  AutoCompleteKeyConfig,
  AutoCompleteRawOption,
  AutoCompleteFilter,
  AutoCompleteListSlotParams
} from './symbol'
