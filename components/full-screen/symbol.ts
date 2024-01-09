export type FullScreenType = 'window' | 'browser'

export interface FullScreenSlotParams {
  full: false | FullScreenType,
  placeId: string,
  enter: (type?: FullScreenType, zIndex?: number) => Promise<void>,
  exit: () => Promise<void>,
  toggle: (type?: FullScreenType, zIndex?: number) => Promise<void>
}

let indexId = 0

export function getIndexId() {
  return `__vxp-full-screen-id-${indexId++}`
}
