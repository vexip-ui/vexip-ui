import { defineComponent, renderSlot, toRefs } from 'vue'

import { configIcons, configLocale, configProps, configZIndex } from '@vexip-ui/config'
import { configProviderProps } from './props'

export default defineComponent({
  name: 'ConfigProvider',
  props: configProviderProps,
  setup(_props, { slots }) {
    const { props, locale, icons, zIndex } = toRefs(_props)

    configProps(props)
    configLocale(locale)
    configIcons(icons)
    configZIndex(zIndex)

    return () => renderSlot(slots, 'default')
  }
})
