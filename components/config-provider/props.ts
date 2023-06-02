import { wrapProps } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { IconsOptions, LocaleOptions } from '@vexip-ui/config'
import type { PropsOptions } from '@/components/props'

export const configProviderProps = wrapProps({
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
})

export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>
