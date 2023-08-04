import { defineComponent, inject, onBeforeUnmount, reactive, renderSlot, watch } from 'vue'

import { useProps } from '@vexip-ui/config'
import { tourStepProps } from './props'
import { TOUR_STATE } from './symbol'

import type { TourPayload, TourStepOptions } from './symbol'

type StepPropKey = keyof typeof tourStepProps

const propKeys = Object.keys(tourStepProps) as StepPropKey[]
const deepProps: StepPropKey[] = []
const ignoredProps: StepPropKey[] = ['renderer']

const funcProp = {
  default: null,
  isFunc: true,
  static: true
}

export default defineComponent({
  name: 'TourStep',
  props: tourStepProps,
  setup(_props, { slots }) {
    const props = useProps('tableColumn', _props, {
      title: '',
      content: '',
      target: {
        default: null,
        static: true
      },
      renderer: funcProp
    })

    const tourState = inject(TOUR_STATE, null)
    const options = reactive({}) as TourStepOptions

    for (const key of propKeys) {
      if (ignoredProps.includes(key)) continue

      watch(
        () => props[key],
        value => {
          (options[key as keyof TourStepOptions] as any) = value
        },
        { deep: deepProps.includes(key) }
      )
    }

    watch(() => props.renderer, setRenderer)

    setRenderer()

    tourState?.increaseStep(options)

    onBeforeUnmount(() => {
      tourState?.decreaseStep(options)
    })

    function setRenderer() {
      if (typeof slots.default === 'function') {
        options.renderer = (payload: TourPayload) => renderSlot(slots, 'default', payload as any)
      } else if (typeof props.renderer === 'function') {
        options.renderer = props.renderer
      } else {
        options.renderer = undefined
      }
    }

    return () => null
  }
})
