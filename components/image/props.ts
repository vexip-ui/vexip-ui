import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { ImageObjectFit } from './symbol'

export const imageProps = buildProps({
  src: String,
  fallbackSrc: String,
  alt: String,
  fit: String as PropType<ImageObjectFit>,
  width: [String, Number],
  height: [String, Number],
  imgAttrs: Object as PropType<Record<string, any>>,
  lazy: booleanProp,
  root: [String, Object, Function] as PropType<unknown>,
  rootMargin: String,
  preview: booleanProp,
  onLoad: eventProp<(event: Event) => void>(),
  onError: eventProp<(event: Event) => void>()
})

export type ImageProps = ExtractPropTypes<typeof imageProps>
export type ImageCProps = ConfigurableProps<ExtractPropTypes<typeof imageProps>, 'src' | 'root'>
