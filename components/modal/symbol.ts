export interface PositionPayload {
  top: number,
  left: number,
}

export interface SizePayload {
  width: number,
  height: number,
}

export interface ModalSlotParams {
  dragging: boolean,
  resizing: boolean,
  handleResize: () => void,
  handleConfirm: () => void,
  handleCancel: () => void,
  handleClose: (isConfirm?: boolean) => Promise<unknown>,
}

export type ModalCommonSlot = (params: ModalSlotParams) => any

export interface ModalSlots {
  header?: ModalCommonSlot,
  title?: ModalCommonSlot,
  close?: ModalCommonSlot,
  default?: ModalCommonSlot,
  footer?: ModalCommonSlot,
}
