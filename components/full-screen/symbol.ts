export type FullScreenType = 'window' | 'browser'

export interface FullScreenSlotParams {
  full: false | FullScreenType,
  enter: (type?: FullScreenType, zIndex?: number) => Promise<void>,
  exit: () => Promise<void>,
  toggle: (type?: FullScreenType, zIndex?: number) => Promise<void>
}
