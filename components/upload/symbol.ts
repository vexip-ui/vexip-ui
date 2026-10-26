import type { ComponentPublicInstance } from 'vue'

export type UploadListType = 'name' | 'detail' | 'thumbnail' | 'card'
export type UploadStatus = 'pending' | 'uploading' | 'fail' | 'success' | 'delete'

export type UploadSourceFile = File & { path?: string }

export type UploadHttpError = Error & {
  response: any,
  url: string,
  status: number,
  method: string,
}

export const enum StatusType {
  PENDING = 'pending',
  UPLOADING = 'uploading',
  FAIL = 'fail',
  SUCCESS = 'success',
  DELETE = 'delete',
}

export interface UploadFileState {
  id: string | number,
  name: string,
  size: number,
  type: string,
  base64: string | null,
  status: UploadStatus,
  percentage: number,
  source: UploadSourceFile | null,
  url: string | null,
  path: string,
  /**
   * @deprecated
   */
  xhr: XMLHttpRequest | null,
  response: any,
  error: UploadHttpError | null,
  abort: () => void,
}

export type UploadFileOptions = Partial<Omit<UploadFileState, 'response' | 'error' | 'abort'>>

type MaybePromise<T> = T | Promise<T>

export type BeforeUpload = (
  file: UploadFileState,
  files: UploadFileState[],
) => MaybePromise<boolean | Blob | UploadSourceFile | void>
export type BeforeSelect = (
  file: UploadFileState,
  files: UploadFileState[],
) => MaybePromise<boolean | void>
export type RenderFn = (data: { file: UploadFileState }) => any

export interface UploadFetchOptions {
  url: string,
  file: UploadSourceFile,
  headers?: Record<string, string>,
  withCredentials?: boolean,
  data?: Record<string, string | Blob>,
  field?: string,
  pathField?: string,
  onProgress?: (percent: number) => void,
  onSuccess?: (response: any) => void,
  onError?: (error: UploadHttpError) => void,
  onAbort?: () => void,
}

/**
 * Should return an abort method.
 */
export type UploadFetchMethod = (options: UploadFetchOptions) => () => void

export interface DirectoryEntity {
  name: string,
  fullPath: string,
  isFile: boolean,
  isDirectory: boolean,
  file: (callback: (file: UploadSourceFile) => void) => void,

  createReader: () => DirectoryReader,
}

export interface DirectoryReader {
  readEntries: (
    onSuccess: (entities: DirectoryEntity[]) => void,
    onError?: (errors: any) => void,
  ) => void,
}

export interface UploadExposed extends ComponentPublicInstance {
  isDragOver: boolean,
  execute: () => Promise<false | any[]>,
  handleDelete: (file: UploadFileState) => void,
  focus: (options?: FocusOptions) => void,
  blur: () => void,
}

export interface UploadListSlots {
  item?: (params: { file: UploadFileState, status: UploadStatus, percentage: number }) => any,
  icon?: (params: { file: UploadFileState, status: UploadStatus, percentage: number }) => any,
  suffix?: () => any,
}

export interface UploadFileSlots {
  default?: (params: { file: UploadFileState, status: UploadStatus, percentage: number }) => any,
  icon?: (params: { file: UploadFileState, status: UploadStatus, percentage: number }) => any,
}

export interface UploadSlots extends Omit<UploadListSlots, 'suffix'> {
  default?: (params: { isDragOver: boolean }) => any,
  tip?: () => any,
  cloud?: () => any,
}

export const uploadListTypes = Object.freeze<UploadListType[]>([
  'name',
  'detail',
  'thumbnail',
  'card',
])

/**
 * @deprecated Use `UploadHttpError` to replace it
 */
export type HttpError = UploadHttpError
/**
 * @deprecated Use `UploadSourceFile` to replace it
 */
export type SourceFile = UploadSourceFile
/**
 * @deprecated Use `UploadFileState` to replace it
 */
export type FileState = UploadFileState
/**
 * @deprecated Use `UploadFileOptions` to replace it
 */
export type FileOptions = UploadFileOptions
