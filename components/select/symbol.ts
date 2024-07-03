import type { ComponentPublicInstance } from 'vue'
import type { OptionKeyConfig, OptionState, RawOption } from '@/components/option'
import type { PopperExposed } from '@/components/popper'
import type { TooltipExposed } from '@/components/tooltip'
import type { VirtualListExposed } from '@/components/virtual-list'

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

export interface SelectExposed extends ComponentPublicInstance {
  idFor?: string,
  labelId?: string,
  currentVisible: boolean,
  currentValues: SelectBaseValue[],
  currentLabels: string[],
  optionStates: SelectOptionState[],
  isHover: boolean,
  currentFilter: string,
  composing: boolean,
  visibleOptions: SelectOptionState[],
  totalOptions: SelectOptionState[],
  wrapper?: HTMLElement | null,
  reference?: HTMLElement | null,
  popper?: PopperExposed | null,
  input?: HTMLInputElement | null,
  device?: HTMLElement | null,
  virtualList?: VirtualListExposed | null,
  restTip?: TooltipExposed | null,
  isSelected: (option: SelectOptionState) => boolean,
  getOptionFromMap: (value?: SelectBaseValue | null) => SelectOptionState | null,
  updateHitting: (hitting: number, ensureInView?: boolean) => void,
  handleClear: () => void,
  focus: (options?: FocusOptions) => void,
  blur: () => void
}
