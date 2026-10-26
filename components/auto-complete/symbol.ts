import type {
  SelectKeyConfig,
  SelectOptionState,
  SelectRawOption,
} from '@/components/select/symbol'

export type AutoCompleteKeyConfig = Omit<SelectKeyConfig, 'label'>
export type AutoCompleteRawOption = SelectRawOption
export type AutoCompleteOptionState = Omit<SelectOptionState, 'label' | 'parent' | 'data'> & {
  parent: AutoCompleteOptionState | null,
  data: AutoCompleteRawOption,
}

export type AutoCompleteFilter = (
  value: string | number,
  options: AutoCompleteOptionState,
) => boolean

export type ChangeEvent = (value: string | number, data: AutoCompleteRawOption) => void
export type EnterEvent = (value: string | number) => void

export interface AutoCompleteListSlotParams {
  options: AutoCompleteOptionState[],
  isSelected: (option: AutoCompleteOptionState) => boolean,
  handleSelect: (option?: AutoCompleteOptionState | null) => void,
}

export interface AutoCompleteSlots {
  prefix?: () => any,
  control?: (params: {
    value: string | number,
    onInput: (event: string | Event) => void,
    onChange: (valid?: boolean) => void,
    onEnter: (event: KeyboardEvent) => void,
    onClear: () => void,
  }) => any,
  suffix?: () => any,
  default?: (params: { option: AutoCompleteOptionState, index: number, selected: boolean }) => any,
  group?: (params: { option: AutoCompleteOptionState, index: number }) => any,
  prepend?: () => any,
  append?: () => any,
  list?: (params: AutoCompleteListSlotParams) => any,
}
