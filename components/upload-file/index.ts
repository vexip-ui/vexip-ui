import UploadFile from '../upload/upload-file.vue'

import type { ComponentPublicInstance } from 'vue'

export { UploadFile }
export { uploadFileProps } from '../upload/props'

export type UploadFileExposed = ComponentPublicInstance & InstanceType<typeof UploadFile>
export type { UploadFileProps, UploadFileCProps } from '../upload/props'
