import Carousel from './carousel.vue'

export { Carousel }
export type CarouselExposed = InstanceType<typeof Carousel>

export type { CarouselProps, CarouselCProps } from './props'
export type { CarouselArrowType, CarouselArrowTrigger, CarouselPointerType } from './symbol'
