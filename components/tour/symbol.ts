import type { InjectionKey, MaybeRef } from 'vue'
import type { MaybeElement, MaybeInstance, Placement } from '@vexip-ui/hooks'
import type { BubbleType } from '@/components/bubble'

export type TourType = BubbleType
export type TourSignType = 'dot' | 'bar' | 'count'

export interface TourVirtual {
  getBoundingClientRect(): { top: number, left: number, width: number, height: number }
}

export type TourTarget =
  | MaybeRef<string | MaybeInstance | TourVirtual>
  | (() => string | MaybeElement | TourVirtual)

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
  type?: TourType,
  renderer?: TourStepRenderFn
}

export type TourSlotParams = TourPayload & { step: TourStepOptions, index: number }
export type TourCommonSLot = (params: TourSlotParams) => any

export interface TourState {
  increaseStep(step: TourStepOptions): void,
  decreaseStep(step: TourStepOptions): void
}

export const TOUR_STATE = '___VXP_TOUR_STATE' as unknown as InjectionKey<TourState>
