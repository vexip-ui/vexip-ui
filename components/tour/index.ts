import Tour from './tour.vue'

import type { ComponentPublicInstance } from 'vue'

Tour.name = 'Tour'

export { Tour }
export type TourExposed = ComponentPublicInstance & InstanceType<typeof Tour>

export type { TourProps, TourCProps } from './props'
export type {
  TourType,
  TourSignType,
  TourVirtual,
  TourTarget,
  TourPayload,
  TourStepOptions,
  TourStepRenderFn,
  TourSlotParams
} from './symbol'
