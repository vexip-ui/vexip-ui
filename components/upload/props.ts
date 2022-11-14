import { buildProps, booleanProp, stateProp, styleProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { IconEffect } from '@/components/icon'
import type { ConfigurableProps } from '@vexip-ui/config'
import type {
  UploadListType,
  BeforeUpload,
  BeforeSelect,
  RenderFn,
  HttpError,
  FileState,
  FileOptions
} from './symbol'

export const uploadProps = buildProps({
  state: stateProp,
  url: String,
  fileList: Array as PropType<FileOptions[]>,
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
  loadingIcon: Object,
  loadingLock: booleanProp,
  loadingEffect: String as PropType<IconEffect>,
  image: booleanProp,
  defaultFiles: Array as PropType<FileOptions[]>,
  canPreview: Function as PropType<(file: FileState) => boolean>,
  onExceed: eventProp<(files: FileState[]) => void>(),
  onChange: eventProp<(files: FileState[]) => void>(),
  onFilterError: eventProp<(files: FileState) => void>(),
  onSizeError: eventProp<(files: FileState) => void>(),
  onDelete: eventProp<(file: FileState) => void>(),
  onPreview: eventProp<(file: FileState) => void>(),
  onProgress: eventProp<(file: FileState, percent: number) => void>(),
  onSuccess: eventProp<(file: FileState, response: any) => void>(),
  onError: eventProp<(file: FileState, error: HttpError) => void>()
})

export type UploadProps = ExtractPropTypes<typeof uploadProps>
export type UploadCProps = ConfigurableProps<
  UploadProps,
  'url' | 'fileList',
  'onBeforeUpload' | 'onBeforeSelect'
>

export const uploadListProps = buildProps({
  files: Array as PropType<FileState[]>,
  selectToAdd: booleanProp,
  iconRenderer: Function as PropType<RenderFn>,
  type: String as PropType<UploadListType>,
  loadingText: String,
  style: styleProp,
  precision: Number,
  canPreview: Function as PropType<(file: FileState) => boolean>,
  onDelete: eventProp<(file: FileState) => void>(),
  onPreview: eventProp<(file: FileState) => void>()
})

export type UploadListProps = ExtractPropTypes<typeof uploadListProps>
export type UploadListCProps = ConfigurableProps<UploadListProps, 'files'>

export const uploadFileProps = buildProps({
  file: Object as PropType<FileState>,
  iconRenderer: Function as PropType<RenderFn>,
  listType: String as PropType<UploadListType>,
  loadingText: String,
  selectToAdd: booleanProp,
  precision: Number,
  canPreview: Function as PropType<(file: FileState) => boolean>,
  onDelete: eventProp<(file: FileState) => void>(),
  onPreview: eventProp<(file: FileState) => void>()
})

export type UploadFileProps = ExtractPropTypes<typeof uploadFileProps>
export type UploadFileCProps = ConfigurableProps<UploadFileProps, 'file'>
