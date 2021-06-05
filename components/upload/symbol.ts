import type { VNodeChild } from 'vue'

// export type UploadStatusType = 'pending' | 'uploading' | 'fail' | 'success' | 'delete'
export type UploadListType = 'name' | 'detail' | 'thumbnail' | 'card'

export type BeforeFn = (file: File, files: File[]) => any | Promise<any>
export type RenderFn = (data: { file: File }) => VNodeChild

export type HttpError = Error & {
  response: any,
  url: string,
  status: number,
  method: string
}

export enum UploadStatusType {
  PENDING,
  UPLOADING,
  FAIL,
  SUCCESS,
  DELETE
}

export interface FileState {
  id: string,
  name: string,
  size: number,
  type: string,
  base64: string | null,
  status: UploadStatusType,
  percentage: number,
  source: File,
  xhr: XMLHttpRequest | null,
  response: any,
  error: HttpError | null
}

export interface UploadOptions {
  url: string,
  file: File,
  headers?: Record<string, string>,
  withCredentials?: boolean,
  data?: Record<string, string | Blob>,
  field?: string,
  onProgress?: (percent: number) => void,
  onSuccess?: (response: any) => void,
  onError?: (error: HttpError) => void,
  onAbort?: () => void
}
