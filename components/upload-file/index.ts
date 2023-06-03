import UploadFile from '../upload/upload-file.vue'

export { UploadFile }
export { uploadFileProps } from '../upload/props'

export type UploadFileExposed = InstanceType<typeof UploadFile>
export type { UploadFileProps, UploadFileCProps } from '../upload/props'
