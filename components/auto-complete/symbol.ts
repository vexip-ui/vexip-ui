import type { SelectKeyConfig, SelectRawOption, SelectOptionState } from '@/components/select'

export type AutoCompleteKeyConfig = Omit<SelectKeyConfig, 'label'>
export type AutoCompleteRawOption = SelectRawOption
export type AutoCompleteOptionState = Omit<SelectOptionState, 'label' | 'parent' | 'data'> & {
  parent: AutoCompleteOptionState | null,
  data: AutoCompleteRawOption
}
