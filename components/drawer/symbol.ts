export type DrawerPlacement = 'top' | 'right' | 'bottom' | 'left'

export interface DrawerSlotParams {
  resizing: boolean,
  handleConfirm: () => void,
  handleCancel: () => void,
  handleClose: (isConfirm?: boolean) => Promise<unknown>
}

export type DrawerCommonSLot = (params: DrawerSlotParams) => any

export const drawerPlacements = Object.freeze<DrawerPlacement[]>(['top', 'right', 'bottom', 'left'])
