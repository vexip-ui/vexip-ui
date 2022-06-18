import { defineComponent, toRef, renderSlot } from 'vue'
import { configProps, configLocale } from '@vexip-ui/config'

import type { PropType } from 'vue'
import type { LocaleOptions } from '@vexip-ui/config'

export default defineComponent({
  name: 'ConfigProvider',
  props: {
    props: {
      type: Object,
      default: () => ({})
    },
    locale: {
      type: Object as PropType<LocaleOptions>,
      default: () => ({})
    }
  },
  setup(props, { slots }) {
    configProps(toRef(props, 'props'))
    configLocale(toRef(props, 'locale'))

    return () => renderSlot(slots, 'default')
  }
})
