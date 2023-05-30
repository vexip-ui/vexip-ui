import AutoComplete from './auto-complete.vue'

export { AutoComplete }
export { autoCompleteProps } from './props'

export type AutoCompleteExposed = InstanceType<typeof AutoComplete>

export type { AutoCompleteProps, AutoCompleteCProps } from './props'
export type { AutoCompleteKeyConfig, AutoCompleteRawOption, AutoCompleteFilter } from './symbol'
