import UploadList from '../upload/upload-list.vue'

import type { ComponentPublicInstance } from 'vue'

export { UploadList }
export { uploadListProps } from '../upload/props'

export type UploadListExposed = ComponentPublicInstance & InstanceType<typeof UploadList>
export type { UploadListProps, UploadListCProps } from '../upload/props'
