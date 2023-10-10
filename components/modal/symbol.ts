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
  handleClose: (isConfirm?: boolean) => Promise<void>
}

export type ModalCommonSLot = (params: ModalSlotParams) => any

let index = 0

export function getIdIndex() {
  return index++
}
