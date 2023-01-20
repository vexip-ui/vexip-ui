import AutoComplete from './auto-complete.vue'

export { AutoComplete }
export type AutoCompleteExposed = InstanceType<typeof AutoComplete>

export type { AutoCompleteProps, AutoCompleteCProps } from './props'
export type { AutoCompleteKeyConfig, AutoCompleteRawOption, AutoCompleteFilter } from './symbol'
