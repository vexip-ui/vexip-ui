import { defineComponent } from 'vue'

import { tourStepProps } from './props'

export default defineComponent({
  name: 'TourStep',
  props: tourStepProps,
  setup() {
    return () => null
  }
})
