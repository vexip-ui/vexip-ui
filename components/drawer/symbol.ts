export type DrawerPlacement = 'top' | 'right' | 'bottom' | 'left'

export interface DrawerSlotParams {
  resizing: boolean,
  handleConfirm: () => void,
  handleCancel: () => void,
  handleClose: (isConfirm?: boolean) => Promise<unknown>
}

export type DrawerCommonSlot = (params: DrawerSlotParams) => any

export interface DrawerSlots {
  header?: DrawerCommonSlot,
  title?: DrawerCommonSlot,
  close?: DrawerCommonSlot,
  default?: DrawerCommonSlot,
  footer?: DrawerCommonSlot,
  handler?: DrawerCommonSlot
}

export const drawerPlacements = Object.freeze<DrawerPlacement[]>(['top', 'right', 'bottom', 'left'])
