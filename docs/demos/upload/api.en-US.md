### Preset Types

```ts
type HttpError = Error & {
  response: any,
  url: string,
  status: number,
  method: string
}

enum UploadStatusType {
  PENDING = 'pending',
  UPLOADING = 'uploading',
  FAIL = 'fail',
  SUCCESS = 'success',
  DELETE = 'delete'
}

type SourceFile = File & { path?: string }

interface FileState {
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

type FileOptions = Partial<Omit<FileState, 'xhr' | 'response' | 'error'>>
type BeforeUpload = (file: FileState, files: FileState[]) => MaybePromise<
  | boolean
  | Blob
  | SourceFile
  | void
>
type BeforeSelect = (file: FileState, files: FileState[]) => MaybePromise<boolean | void>
```

### Upload Props

| Name             | Type                                             | Description                                                                                                                                                                                         | Default            | Since   |
| ---------------- | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------- |
| state            | `'default' \| 'success' \| 'error' \| 'warning'` | the state of upload                                                                                                                                                                                 | `'default'`        | `2.0.0` |
| url              | `string`                                         | The file upload destination url                                                                                                                                                                     | `''`               | -       |
| file-list        | `FileState[]`                                    | Set the file list of upload, can use `v-model` for two-way binding                                                                                                                                  | `[]`               | `2.0.0` |
| multiple         | `boolean`                                        | Set whether to select multiple files                                                                                                                                                                | `false`            | -       |
| tip              | `string`                                         | Set the upload tip                                                                                                                                                                                  | `''`               | -       |
| loading-text     | `string`                                         | Set the text prompt when loading                                                                                                                                                                    | `locale.uploading` | -       |
| list-type        | `string`                                         | Set the type of file list, optional values ​​are `name`, `thumbnail`, `card`                                                                                                                        | `'name'`           | -       |
| select-to-add    | `boolean`                                        | Set whether to select files in incremental mode                                                                                                                                                     | `false`            | -       |
| block            | `boolean`                                        | Whether it is a block-level element, the width becomes `100%` after setting                                                                                                                         | `false`            | -       |
| accept           | `string \| string[]`                             | The `accept` attribute of the native `<input>`, when an array is passed in, it will be automatically connected with `,`                                                                             | `null`             | -       |
| filter           | `string \| string[]`                             | Set file type filter, filter by file extension                                                                                                                                                      | `''`               | -       |
| max-size         | `number`                                         | Set the max size of uploaded files                                                                                                                                                                  | `null`             | -       |
| field            | `string`                                         | The field that sets the file in the request form data                                                                                                                                               | `'file'`           | -       |
| data             | `Record<string, string \| Blob>`                 | Set the data to upload with the file, in the form of `key-value`                                                                                                                                    | `{}`               | -       |
| headers          | `Record<string, string>`                         | Set request headers for upload request                                                                                                                                                              | `{}`               | -       |
| with-credentials | `boolean`                                        | Set whether upload request carries cookie information                                                                                                                                               | `false`            | -       |
| manual           | `boolean`                                        | Set whether to not automatically initiate upload after file selection                                                                                                                               | `false`            | -       |
| hidden-files     | `boolean`                                        | Set whether to hide the file list                                                                                                                                                                   | `false`            | -       |
| hidden-icon      | `boolean`                                        | Set whether to hide the file icon                                                                                                                                                                   | `false`            | -       |
| count-limit      | `number`                                         | Set the max number of files to upload when multiple files are selected. When it is `0`, there is no limit                                                                                           | `0`                | -       |
| allow-drag       | `boolean`                                        | Set whether to allow uploading by dragging files                                                                                                                                                    | `false`            | -       |
| on-before-upload | `BeforeUpload`                                   | Set the callback before file upload, support async function and Promise, the return value of `false` will prevent the upload, return `Blob` or `File` to overwrite the source file                  | `null`             | -       |
| on-before-select | `BeforeSelect`                                   | Set the callback before select file, supports async functions and Promise, the return value of `false` will prevent select                                                                          | `null`             | -       |
| icon-renderer    | `(data: { file: FileState }) => any`             | The rendering method of the file icon, the first parameter is h, the second parameter is the File object                                                                                            | `null`             | -       |
| directory        | `boolean`                                        | Set whether to enable folder uploading. Note that when using click upload, only folders can be forced to be uploaded. At the same time, this feature requires browsers to support `webkitdirectory` | `false`            | -       |
| path-field       | `string`                                         | Set the field of the file path in the request form data, enable the relative location of the file after the folder is uploaded                                                                      | `'path'`           | -       |
| disabled-click   | `boolean`                                        | Set whether to disable click to upload, if disabled, drag and drop upload will be enabled by default                                                                                                | `false`            | -       |
| button-label     | `string`                                         | Set the text content of the built-in upload button                                                                                                                                                  | `locale.upload`    | `2.0.0` |
| disabled         | `boolean`                                        | Set whether the upload is disabled                                                                                                                                                                  | `false`            | `2.0.0` |
| loading          | `boolean`                                        | Set whether is loading                                                                                                                                                                              | `false`            | `2.0.0` |
| loading-icon     | `Record<string, any>`                            | Set the loading icon                                                                                                                                                                                | `Spinner`          | `2.0.0` |
| loading-lock     | `boolean`                                        | Set whether to be read-only when loading                                                                                                                                                            | `false`            | `2.0.0` |
| loading-spin     | `boolean`                                        | Set whether to use spin animation for the loading icon                                                                                                                                              | `false`            | `2.0.0` |
| default-files    | `FileOptions`                                    | Set static file list                                                                                                                                                                                | `[]`               | `2.0.0` |
| can-preview      | `(file: FileState) => boolean>`                  | Determine whether the file can be previewed                                                                                                                                                         | `isImage`          | `2.0.0` |
| image            | `boolean`                                        | Whether to enable image upload mode, `accept` and `list-type` props will be invalid after enable                                                                                                    | `false`            | `2.0.8` |

### Upload Events

| Name         | Description                                                                                                               | Parameters                            | Since |
| ------------ | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ----- |
| change       | Emitter when the selected file changes, returns the list of selected files                                                | `(files: FileState[])`                | -     |
| filter-error | Emitter when file type verification fails, returns the failed file                                                        | `(errorFile: FileState)`              | -     |
| size-error   | Emitter when the file size check fails, returns the failed file                                                           | `(errorFile: FileState)`              | -     |
| progress     | Emitted when the progress of the uploaded file is updated, returns the latest progress and file                           | `(file: FileState, percent: number)`  | -     |
| success      | Emitter when the file is uploaded successfully, returns the latest progress and file                                      | `(file: FileState, response: any)`    | -     |
| error        | Emitter when file upload fails, returns the latest progress and file                                                      | `(file: FileState, error: HttpError)` | -     |
| delete       | Emitter when the selected (uploaded) file is deleted, returns the deleted file                                            | `(file: FileState)`                   | -     |
| exceed       | Emitter when the selected file exceeds the upper limit, returns the list of exceeded files and the list of selected files | `(exceedFiles: FileState[])`          | -     |
| preview      | Emitter when a file is previewed, returns the previewed file                                                              | `(file: FileState)`                   | -     |

### Upload Slots

| Name    | Description                                                                                                             | Parameters                                                          | Since |
| ------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ----- |
| default | Select the control slot of the file, `isDragOver` is used to mark whether there is content to be dragged on the control | `{ isDragOver: boolean }`                                           | -     |
| tip     | Tip content slot, if the default slot is used, the slot will be invalid                                                 | -                                                                   | -     |
| item    | Content slot for file info in file list                                                                                 | `{ file: FileState, status: UploadStatusType, percentage: number }` | -     |
| icon    | Slot for file icon                                                                                                      | `{ file: FileState }`                                               | -     |

### UploadList Props

| Name          | Type                                 | Description                                                                                                                                                                              | Default            | Since   |
| ------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------- |
| files         | `FileState[]`                        | Set the file data rendered by the file list. Its element is a proxy object inside the Upload component, which can be obtained through the `renderFiles` property of the Upload component | `[]`               | -       |
| select-to-add | `boolean`                            | Set whether to change the file list incrementally, which will produce different transition effects                                                                                       | `false`            | -       |
| icon-renderer | `(data: { file: FileState }) => any` | Same to Upload `icon-renderer` prop                                                                                                                                                      | `null`             | -       |
| loading-text  | `string`                             | Set the text prompt when the file is loaded                                                                                                                                              | `locale.uploading` | -       |
| can-preview   | `(file: FileState) => boolean>`      | Determine whether the file can be previewed                                                                                                                                              | `isImage`          | `2.0.0` |

### UploadList Events

| Name    | Description                                                                    | Parameters          | Since |
| ------- | ------------------------------------------------------------------------------ | ------------------- | ----- |
| delete  | Emitter when the selected (uploaded) file is deleted, returns the deleted file | `(file: FileState)` | -     |
| preview | Emitter when a file is previewed, returns the previewed file                   | `(file: FileState)` | -     |

### UploadList Slots

| Name | Description                             | Parameters                                                          | Since |
| ---- | --------------------------------------- | ------------------------------------------------------------------- | ----- |
| item | Content slot for file info in file list | `{ file: FileState, status: UploadStatusType, percentage: number }` | -     |
| icon | Slot for file icon                      | `{ file: FileState }`                                               | -     |
