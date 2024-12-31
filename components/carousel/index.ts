import Carousel from './carousel.vue'

import type { ComponentPublicInstance } from 'vue'

export { Carousel }
export { carouselProps } from './props'

export type CarouselExposed = ComponentPublicInstance & InstanceType<typeof Carousel>

export type { CarouselProps, CarouselCProps } from './props'
export type {
  CarouselArrowType,
  CarouselArrowTrigger,
  CarouselPointerType,
  CarouselSlots
} from './symbol'
