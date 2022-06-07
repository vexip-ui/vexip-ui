import { defineComponent, computed, provide, inject, renderSlot } from 'vue'
import { mergeObjects } from '@vexip-ui/utils'
import { PROVIDED_PROPS } from './props'
import { PROVIDED_LOCALE, getDefaultLocaleConfig } from './locale'

import type { PropType, ComputedRef } from 'vue'
import type { LocaleConfig, LocaleOptions } from './locale'

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
    const upstreamProps = inject<ComputedRef<Record<string, any>> | null>(PROVIDED_PROPS, null)

    const providedProps = computed(() => {
      if (!upstreamProps?.value) {
        return props.props
      }

      return mergeObjects(upstreamProps.value, props.props)
    })

    provide(PROVIDED_PROPS, providedProps)

    const upstreamLocale = inject<ComputedRef<LocaleConfig> | null>(PROVIDED_LOCALE, null)

    const locale = computed(() => {
      if (!upstreamLocale?.value) {
        return mergeObjects(getDefaultLocaleConfig(), props.locale)
      }

      return mergeObjects(upstreamLocale.value, props.locale)
    })

    provide(PROVIDED_LOCALE, locale)

    return () => renderSlot(slots, 'default')
  }
})
