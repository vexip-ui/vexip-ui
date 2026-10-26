export interface SwitchSlots {
  open?: () => any,
  close?: () => any,
  loading?: () => any,
  icon?: (params: { value: boolean }) => any,
}
