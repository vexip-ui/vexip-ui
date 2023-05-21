import { booleanProp, buildProps, classProp, styleProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { IconMinorProps } from '@/components/icon'
import type { ToastOptions, ToastPosition } from './symbol'

export const toastProps = buildProps({
  bodyWidth: Number,
  icon: [Object, Function] as PropType<Record<string, any> | (() => any)>,
  iconProps: Object as PropType<IconMinorProps>,
  position: String as PropType<ToastPosition>,
  transitionName: String,
  closable: booleanProp,
  maskClose: booleanProp,
  showMask: booleanProp,
  maskClass: classProp,
  maskStyle: styleProp,
  parseHtml: booleanProp,
  renderer: Function as PropType<(options: ToastOptions) => any>
})

export type ToastProps = ExtractPropTypes<typeof toastProps>
export type ToastCProps = ConfigurableProps<ToastProps, 'renderer'>
