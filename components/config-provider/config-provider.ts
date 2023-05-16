import { defineComponent, renderSlot, toRefs } from 'vue'

import { configIcons, configLocale, configProps, configZIndex } from '@vexip-ui/config'

import type { PropType } from 'vue'
import type { IconsOptions, LocaleOptions } from '@vexip-ui/config'
import type { PropsOptions } from '@/components/props'

export default defineComponent({
  name: 'ConfigProvider',
  props: {
    props: {
      type: Object as PropType<PropsOptions>,
      default: () => ({})
    },
    locale: {
      type: Object as PropType<LocaleOptions>,
      default: () => ({})
    },
    icons: {
      type: Object as PropType<IconsOptions>,
      default: () => ({})
    },
    zIndex: {
      type: Number,
      default: null
    }
  },
  setup(_props, { slots }) {
    const { props, locale, icons, zIndex } = toRefs(_props)

    configProps(props)
    configLocale(locale)
    configIcons(icons)
    configZIndex(zIndex)

    return () => renderSlot(slots, 'default')
  }
})
