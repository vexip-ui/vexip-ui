import { defineComponent, toRef, renderSlot } from 'vue'
import { configProps, configLocale } from '@vexip-ui/config'

import type { PropType } from 'vue'
import type { LocaleOptions } from '@vexip-ui/config'
import type { ProvidedProps } from '@/components/props'

export default defineComponent({
  name: 'ConfigProvider',
  props: {
    props: {
      type: Object as PropType<ProvidedProps>,
      default: () => ({})
    },
    locale: {
      type: Object as PropType<LocaleOptions>,
      default: () => ({})
    }
  },
  setup(props, { slots }) {
    configProps(toRef(props, 'props') as any)
    configLocale(toRef(props, 'locale'))

    return () => renderSlot(slots, 'default')
  }
})
