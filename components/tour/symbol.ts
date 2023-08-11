import type { InjectionKey } from 'vue'
import type { MaybeElement, MaybeInstance, MaybeRef, Placement } from '@vexip-ui/hooks'

export type TourSignType = 'dot' | 'bar' | 'count'
export type TourTarget = MaybeRef<string | MaybeInstance> | (() => string | MaybeElement)

export interface TourPayload {
  start(): void,
  prev(): void,
  next(autoClose?: boolean): void,
  close(): void
}

export type TourStepRenderFn = (payload: TourPayload) => any

export interface TourStepOptions {
  target?: TourTarget,
  placement?: Placement,
  title?: string,
  content?: string,
  order?: number,
  renderer?: TourStepRenderFn
}

export type TourSlotParams = TourPayload & { step: TourStepOptions, index: number }
export type TourCommonSLot = (params: TourSlotParams) => any

export interface TourState {
  increaseStep(step: TourStepOptions): void,
  decreaseStep(step: TourStepOptions): void
}

export const TOUR_STATE = Symbol('TOUR_STATE') as InjectionKey<TourState>

let index = 0

export function getIdIndex() {
  return index++
}
