import type { ComponentPublicInstance } from 'vue'

export type UploadListType = 'name' | 'detail' | 'thumbnail' | 'card'
export type UploadStatusType = 'pending' | 'uploading' | 'fail' | 'success' | 'delete'

export type SourceFile = File & { path?: string }

export type HttpError = Error & {
  response: any,
  url: string,
  status: number,
  method: string
}

export const enum StatusType {
  PENDING = 'pending',
  UPLOADING = 'uploading',
  FAIL = 'fail',
  SUCCESS = 'success',
  DELETE = 'delete'
}

export type FileStatus = 'pending' | 'uploading' | 'fail' | 'success' | 'delete'

export interface FileState {
  id: string | number,
  name: string,
  size: number,
  type: string,
  base64: string | null,
  status: FileStatus,
  percentage: number,
  source: SourceFile | null,
  url: string | null,
  path: string,
  xhr: XMLHttpRequest | null,
  response: any,
  error: HttpError | null
}

export type FileOptions = Partial<Omit<FileState, 'xhr' | 'response' | 'error'>>

type MaybePromise<T> = T | Promise<T>

export type BeforeUpload = (
  file: FileState,
  files: FileState[]
) => MaybePromise<boolean | Blob | SourceFile | void>
export type BeforeSelect = (file: FileState, files: FileState[]) => MaybePromise<boolean | void>
export type RenderFn = (data: { file: FileState }) => any

export interface UploadOptions {
  url: string,
  file: SourceFile,
  headers?: Record<string, string>,
  withCredentials?: boolean,
  data?: Record<string, string | Blob>,
  field?: string,
  pathField?: string,
  onProgress?: (percent: number) => void,
  onSuccess?: (response: any) => void,
  onError?: (error: HttpError) => void,
  onAbort?: () => void
}
export interface DirectoryEntity {
  name: string,
  fullPath: string,
  isFile: boolean,
  isDirectory: boolean,
  file: (callback: (file: SourceFile) => void) => void,

  createReader: () => DirectoryReader
}

export interface DirectoryReader {
  readEntries: (
    onSuccess: (entities: DirectoryEntity[]) => void,
    onError?: (errors: any) => void
  ) => void
}

export interface UploadExposed extends ComponentPublicInstance {
  execute: () => Promise<false | any[]>,
  handleDelete: (file: FileState) => void,
  focus: (options?: FocusOptions) => void,
  blur: () => void
}

export const uploadListTypes = Object.freeze<UploadListType[]>([
  'name',
  'detail',
  'thumbnail',
  'card'
])
