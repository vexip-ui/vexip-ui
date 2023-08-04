import type { InjectionKey } from 'vue'

export type TourTarget = string | Element | (() => string | Element)

export interface TourPayload {
  start(): void,
  prev(): void,
  next(autoClose?: boolean): void,
  close(): void
}

export type TourStepRenderFn = (payload: TourPayload) => any

export interface TourStepOptions {
  target: TourTarget,
  title?: string,
  content?: string,
  renderer?: TourStepRenderFn
}

export interface TourState {
  increaseStep(step: TourStepOptions): void,
  decreaseStep(step: TourStepOptions): void
}

export const TOUR_STATE = Symbol('TOUR_STATE') as InjectionKey<TourState>
