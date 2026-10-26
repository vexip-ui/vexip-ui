import TourStep from '../tour/tour-step'

import type { ComponentPublicInstance } from 'vue'

export { TourStep }
export { tourStepProps } from '../tour/props'

export type TourStepExposed = ComponentPublicInstance & InstanceType<typeof TourStep>
export type { TourStepProps, TourStepCProps } from '../tour/props'
