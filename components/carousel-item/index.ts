import CarouselItem from '../carousel/carousel-item.vue'

import type { ComponentPublicInstance } from 'vue'

export { CarouselItem }
export type CarouselItemExposed = ComponentPublicInstance & InstanceType<typeof CarouselItem>
