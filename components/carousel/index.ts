import Carousel from './carousel.vue'

export { Carousel }
export { carouselProps } from './props'

export type CarouselExposed = InstanceType<typeof Carousel>

export type { CarouselProps, CarouselCProps } from './props'
export type { CarouselArrowType, CarouselArrowTrigger, CarouselPointerType } from './symbol'
