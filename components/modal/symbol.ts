export interface PositionPayload {
  top: number,
  left: number
}

export interface SizePayload {
  width: number,
  height: number
}

export interface ModalSlotParams {
  dragging: boolean,
  resizing: boolean,
  handleResize: () => void,
  handleConfirm: () => void,
  handleCancel: () => void,
  handleClose: (isConfirm?: boolean) => Promise<unknown>
}

export type ModalCommonSLot = (params: ModalSlotParams) => any
