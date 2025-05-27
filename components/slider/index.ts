import Slider from './slider.vue'

import type { ComponentPublicInstance } from 'vue'

export { Slider }
export { sliderProps } from './props'

export type SliderExposed = ComponentPublicInstance & InstanceType<typeof Slider>

export type { SliderProps, SliderCProps } from './props'
export type {
  SliderMarker,
  SliderRawMarkers,
  SliderTipProps,
  SliderSlotParams,
  SliderTriggerParams,
  SliderMarkerSlotParams,
  SliderSlots,
} from './symbol'
