import Tour from './tour.vue'

Tour.name = 'Tour'

export { Tour }
export type TourExposed = InstanceType<typeof Tour>

export type { TourProps, TourCProps } from './props'
export type { TourSignType, TourPayload, TourStepOptions, TourStepRenderFn } from './symbol'
