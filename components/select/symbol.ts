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

export interface SelectSlots {
  selected?: (params: {
    value: SelectBaseValue,
    option: SelectOptionState | null,
    preview?: boolean
  }) => any,
  prefix?: () => any,
  suffix?: () => any,
  control?: () => any,
  tag?: (params: {
    value: SelectBaseValue,
    option: SelectOptionState | null,
    handleClose: () => void
  }) => any,
  restTag?: (params: { restCount: number }) => any,
  list?: (params: SelectListSlotParams) => any,
  prepend?: () => any,
  append?: () => any,
  /**
   * Option content slot.
   */
  default?: (params: { option: SelectOptionState, index: number, selected: boolean }) => any,
  group?: (params: { option: SelectOptionState, index: number }) => any,
  empty?: () => any
}

export const defaultKeyConfig: Required<SelectKeyConfig> = Object.freeze({
  value: 'value',
  label: 'label',
  disabled: 'disabled',
  divided: 'divided',
  title: 'title',
  group: 'group',
  children: 'children',
})
