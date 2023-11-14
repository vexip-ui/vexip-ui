import { defineComponent, renderSlot, toRefs } from 'vue'

import {
  configHoverDelay,
  configIcons,
  configLocale,
  configProps,
  configZIndex,
  useNameHelper
} from '@vexip-ui/config'
import { configProviderProps } from './props'

export default defineComponent({
  name: 'ConfigProvider',
  props: configProviderProps,
  setup(_props, { slots }) {
    const { props, locale, icons, zIndex, theme, hoverDelay } = toRefs(_props)

    const nh = useNameHelper('config-provider')

    configProps(props)
    configLocale(locale)
    configIcons(icons)
    configZIndex(zIndex)
    configHoverDelay(hoverDelay)

    return () => {
      if (theme.value) {
        return (
          <section class={[nh.b(), nh.ns(`theme-vars-${theme.value}`)]}>
            {renderSlot(slots, 'default')}
          </section>
        )
      }

      return renderSlot(slots, 'default')
    }
  }
})
