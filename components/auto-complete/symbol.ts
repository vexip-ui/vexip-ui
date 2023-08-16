import type {
  SelectKeyConfig,
  SelectOptionState,
  SelectRawOption
} from '@/components/select/symbol'

export type AutoCompleteKeyConfig = Omit<SelectKeyConfig, 'label'>
export type AutoCompleteRawOption = SelectRawOption
export type AutoCompleteOptionState = Omit<SelectOptionState, 'label' | 'parent' | 'data'> & {
  parent: AutoCompleteOptionState | null,
  data: AutoCompleteRawOption
}

export type AutoCompleteFilter = (
  value: string | number,
  options: AutoCompleteOptionState
) => boolean

export type ChangeEvent = (value: string | number, data: AutoCompleteRawOption) => void
export type EnterEvent = (value: string | number) => void
