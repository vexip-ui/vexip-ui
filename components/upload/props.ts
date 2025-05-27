import {
  booleanProp,
  buildProps,
  eventProp,
  iconProp,
  localeProp,
  stateProp,
  styleProp,
} from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { IconEffect } from '@/components/icon'
import type { ConfigurableProps } from '@vexip-ui/config'
import type {
  BeforeSelect,
  BeforeUpload,
  RenderFn,
  UploadFetchMethod,
  UploadFileOptions,
  UploadFileSlots,
  UploadFileState,
  UploadHttpError,
  UploadListSlots,
  UploadListType,
  UploadSlots,
} from './symbol'

export const uploadProps = buildProps({
  state: stateProp,
  locale: localeProp('upload'),
  url: String,
  fileList: Array as PropType<UploadFileOptions[]>,
  multiple: booleanProp,
  tip: String,
  accept: [String, Array] as PropType<string | string[]>,
  filter: [String, Array] as PropType<string | string[]>,
  maxSize: Number,
  field: String,
  data: Object as PropType<Record<string, string | Blob>>,
  headers: Object as PropType<Record<string, string>>,
  withCredentials: booleanProp,
  manual: booleanProp,
  hiddenFiles: booleanProp,
  countLimit: Number,
  allowDrag: booleanProp,
  onBeforeUpload: Function as PropType<BeforeUpload>,
  onBeforeSelect: Function as PropType<BeforeSelect>,
  iconRenderer: Function as PropType<RenderFn>,
  selectToAdd: booleanProp,
  listType: String as PropType<UploadListType>,
  block: booleanProp,
  loadingText: String,
  directory: booleanProp,
  pathField: String,
  disabledClick: booleanProp,
  buttonLabel: String,
  disabled: booleanProp,
  loading: booleanProp,
  loadingIcon: iconProp,
  loadingLock: booleanProp,
  loadingEffect: String as PropType<IconEffect>,
  image: booleanProp,
  defaultFiles: Array as PropType<UploadFileOptions[]>,
  canPreview: Function as PropType<(file: UploadFileState) => boolean>,
  listStyle: styleProp,
  name: String,
  customFetch: Function as PropType<UploadFetchMethod>,
  slots: Object as PropType<UploadSlots>,
  onExceed: eventProp<(files: UploadFileState[]) => void>(),
  onChange: eventProp<(files: UploadFileState[]) => void>(),
  onFilterError: eventProp<(files: UploadFileState) => void>(),
  onSizeError: eventProp<(files: UploadFileState) => void>(),
  onDelete: eventProp<(file: UploadFileState) => void>(),
  onPreview: eventProp<(file: UploadFileState) => void>(),
  onProgress: eventProp<(file: UploadFileState, percent: number) => void>(),
  onSuccess: eventProp<(file: UploadFileState, response: any) => void>(),
  onError: eventProp<(file: UploadFileState, error: UploadHttpError) => void>(),
})

export type UploadProps = ExtractPropTypes<typeof uploadProps>
export type UploadCProps = ConfigurableProps<
  UploadProps,
  'url' | 'fileList',
  'onBeforeUpload' | 'onBeforeSelect'
>

export const uploadListProps = buildProps({
  files: Array as PropType<UploadFileState[]>,
  selectToAdd: booleanProp,
  iconRenderer: Function as PropType<RenderFn>,
  type: String as PropType<UploadListType>,
  loadingText: String,
  style: styleProp,
  precision: Number,
  canPreview: Function as PropType<(file: UploadFileState) => boolean>,
  slots: Object as PropType<UploadListSlots>,
  onDelete: eventProp<(file: UploadFileState) => void>(),
  onPreview: eventProp<(file: UploadFileState) => void>(),
})

export type UploadListProps = ExtractPropTypes<typeof uploadListProps>
export type UploadListCProps = ConfigurableProps<UploadListProps, 'files'>

export const uploadFileProps = buildProps({
  locale: localeProp('upload'),
  file: Object as PropType<UploadFileState>,
  iconRenderer: Function as PropType<RenderFn>,
  listType: String as PropType<UploadListType>,
  loadingText: String,
  selectToAdd: booleanProp,
  precision: Number,
  canPreview: Function as PropType<(file: UploadFileState) => boolean>,
  slots: Object as PropType<UploadFileSlots>,
  onDelete: eventProp<(file: UploadFileState) => void>(),
  onPreview: eventProp<(file: UploadFileState) => void>(),
})

export type UploadFileProps = ExtractPropTypes<typeof uploadFileProps>
export type UploadFileCProps = ConfigurableProps<UploadFileProps, 'file'>
