export type TourTarget = string | Element | (() => string | Element)

export interface TourStepConfig {
  target: TourTarget,
  title?: string,
  content?: string
}
