import type { ComponentPublicInstance } from 'vue'

export interface TransferKeyConfig {
  value?: string,
  label?: string,
  disabled?: string,
}

export interface TransferOptionState {
  value: string | number,
  label: string,
  disabled: boolean,
  hidden: boolean,
  hitting: boolean,
  data: string | Record<string, any>,
}

export type TransferFilter = (
  value: string,
  options: TransferOptionState,
  type: 'source' | 'target',
) => boolean

export interface TransferExposed extends ComponentPublicInstance {
  handleToTarget: () => void,
  handleToSource: () => void,
  handlePanelFocus: (type: 'source' | 'target') => void,
  handlePanelBlur: () => void,
  focus: (options?: FocusOptions) => void,
  blur: () => void,
}

export interface TransferPanelSlotParams {
  type: 'source' | 'target',
  currentPage: number,
  pageSize: number,
  totalPages: number,
  allSelected: boolean,
  partial: boolean,
  selected: (string | number)[],
  options: TransferOptionState[],
  toggleSelectAll: (event?: Event) => void,
  handleReverse: () => void,
}

export interface TransferOptionSlotParams {
  type: 'source' | 'target',
  option: TransferOptionState,
  index: number,
}

export interface TransferSlots {
  actions?: (params: { handleToTarget: () => void, handleToSource: () => void }) => any,

  option?: (params: TransferOptionSlotParams) => any,
  label?: (params: TransferOptionSlotParams) => any,
  header?: (params: TransferPanelSlotParams) => any,
  title?: (params: TransferPanelSlotParams) => any,
  body?: (params: TransferPanelSlotParams) => any,
  footer?: (params: TransferPanelSlotParams) => any,

  sourceOption?: (params: TransferOptionSlotParams) => any,
  sourceLabel?: (params: TransferOptionSlotParams) => any,
  sourceHeader?: (params: TransferPanelSlotParams) => any,
  sourceTitle?: (params: TransferPanelSlotParams) => any,
  sourceBody?: (params: TransferPanelSlotParams) => any,
  sourceFooter?: (params: TransferPanelSlotParams) => any,

  targetOption?: (params: TransferOptionSlotParams) => any,
  targetLabel?: (params: TransferOptionSlotParams) => any,
  targetHeader?: (params: TransferPanelSlotParams) => any,
  targetTitle?: (params: TransferPanelSlotParams) => any,
  targetBody?: (params: TransferPanelSlotParams) => any,
  targetFooter?: (params: TransferPanelSlotParams) => any,
}
