import type { OptionKeyConfig, OptionState, RawOption } from '@/components/option'

export interface SelectKeyConfig extends OptionKeyConfig {
  group?: string,
  children?: string
}

export type SelectRawOption = RawOption
export type SelectBaseValue = string | number | boolean
export type SelectValue = SelectBaseValue | SelectBaseValue[] | null

export interface SelectOptionState extends OptionState {
  group: boolean,
  depth: number,
  parent: SelectOptionState | null,
  data: SelectRawOption
}

export type SelectFilter = (value: string, option: SelectOptionState) => boolean

export type SelectFilterPosition = 'in-control' | 'in-list'

export type SelectEvent = (value: SelectBaseValue, data: any) => void
export type ChangeEvent = (value: SelectValue, data: any | any[]) => void

export interface SelectListSlotParams {
  options: SelectOptionState[],
  isSelected: (option: SelectOptionState) => boolean,
  handleSelect: (option?: SelectOptionState | null) => void
}
