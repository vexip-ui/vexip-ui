import { booleanProp, booleanStringProp, buildProps, eventProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { ImageObjectFit, ImageSkeletonProps } from './symbol'

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
  skeleton: {
    type: [Boolean, Object] as PropType<boolean | ImageSkeletonProps>,
    default: null
  },
  placeholder: String,
  errorTip: String,
  radius: Number,
  border: booleanStringProp,
  previewSrc: String,
  viewerTransfer: booleanStringProp,
  onLoad: eventProp<(event: Event) => void>(),
  onError: eventProp<(event: Event) => void>(),
  onPreview: eventProp<(src: string) => void>()
})

export type ImageProps = ExtractPropTypes<typeof imageProps>
export type ImageCProps = ConfigurableProps<ExtractPropTypes<typeof imageProps>, 'src'>

export const imageGroupProps = buildProps({
  showAll: booleanProp,
  preview: booleanProp,
  viewerTransfer: booleanStringProp,
  onPreview: eventProp<(src: string, srcList: string[]) => void>()
})

export type ImageGroupProps = ExtractPropTypes<typeof imageGroupProps>
export type ImageGroupCProps = ConfigurableProps<ExtractPropTypes<typeof imageGroupProps>>

export const imageViewerProps = buildProps({
  active: booleanProp,
  index: Number,
  /** @deprecated */
  srcs: [String, Array] as PropType<string | string[]>,
  srcList: [String, Array] as PropType<string | string[]>,
  transfer: booleanStringProp,
  onToggle: eventProp<(active: boolean) => void>(),
  onChange: eventProp<(index: number, src: string) => void>(),
  onPrev: eventProp<(index: number, src: string) => void>(),
  onNext: eventProp<(index: number, src: string) => void>(),
  onClose: eventProp(),
  onShow: eventProp(),
  onHide: eventProp()
})

export type ImageViewerProps = ExtractPropTypes<typeof imageViewerProps>
export type ImageViewerCProps = ConfigurableProps<ExtractPropTypes<typeof imageViewerProps>, 'srcs'>
