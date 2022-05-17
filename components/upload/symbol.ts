// export type UploadStatusType = 'pending' | 'uploading' | 'fail' | 'success' | 'delete'
export type UploadListType = 'name' | 'detail' | 'thumbnail' | 'card'

export type BeforeFn = (file: File, files: File[]) => any | Promise<any>
export type RenderFn = (data: { file: File }) => any

export type HttpError = Error & {
  response: any,
  url: string,
  status: number,
  method: string
}

export enum UploadStatusType {
  PENDING = 'pending',
  UPLOADING = 'uploading',
  FAIL = 'fail',
  SUCCESS = 'success',
  DELETE = 'delete'
}

export type SourceFile = File & { path?: string }

export interface FileState {
  id: string,
  name: string,
  size: number,
  type: string,
  base64: string | null,
  status: UploadStatusType,
  percentage: number,
  source: SourceFile,
  path: string,
  xhr: XMLHttpRequest | null,
  response: any,
  error: HttpError | null
}

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
  // eslint-disable-next-line no-use-before-define
  createReader: () => DirectoryReader
}

export interface DirectoryReader {
  readEntries: (
    onSuccess: (entities: DirectoryEntity[]) => void,
    onError?: (errors: any) => void
  ) => void
}
