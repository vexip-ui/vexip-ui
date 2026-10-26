import { booleanProp, buildProps, classProp, iconProp, styleProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { IconMinorProps } from '@/components/icon'
import type { ToastOptions, ToastPosition } from './symbol'

export const toastProps = buildProps({
  bodyWidth: Number,
  icon: iconProp,
  iconProps: Object as PropType<IconMinorProps>,
  position: String as PropType<ToastPosition>,
  transitionName: String,
  closable: booleanProp,
  maskClose: booleanProp,
  showMask: booleanProp,
  maskClass: classProp,
  maskStyle: styleProp,
  parseHtml: booleanProp,
  renderer: Function as PropType<(options: ToastOptions) => any>,
})

export type ToastProps = ExtractPropTypes<typeof toastProps>
export type ToastCProps = ConfigurableProps<ToastProps, 'renderer'>
