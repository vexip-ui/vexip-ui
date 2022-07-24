### Upload Props

| Name             | Type                                                             | Description                                                                                                                                                                                                                         | Default            | Since   |
| ---------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------- |
| state            | `'default' \| 'success' \| 'error' \| 'warning'`                 | the state of upload                                                                                                                                                                                                                 | `'default'`        | `2.0.0` |
| url              | `string`                                                         | The file upload destination url                                                                                                                                                                                                     | `''`               | -       |
| file-list        | `FileState[]`                                                    | Set the file list of upload, can use `v-model` for two-way binding                                                                                                                                                                  | `[]`               | `2.0.0` |
| multiple         | `boolean`                                                        | Set whether to select multiple files                                                                                                                                                                                                | `false`            | -       |
| tip              | `string`                                                         | Set the upload tip                                                                                                                                                                                                                  | `''`               | -       |
| loading-text     | `string`                                                         | Set the text prompt when loading                                                                                                                                                                                                    | `locale.uploading` | -       |
| list-type        | `string`                                                         | Set the type of file list, optional values ​​are `name`, `thumbnail`, `card`                                                                                                                                                        | `'name'`           | -       |
| select-to-add    | `boolean`                                                        | Set whether to select files in incremental mode                                                                                                                                                                                     | `false`            | -       |
| block            | `boolean`                                                        | Whether it is a block-level element, the width becomes `100%` after setting                                                                                                                                                         | `false`            | -       |
| accept           | `string \| string[]`                                             | The `accept` attribute of the native `<input>`, when an array is passed in, it will be automatically connected with `,`                                                                                                             | `null`             | -       |
| filter           | `string \| string[]`                                             | Set file type filter, filter by file extension                                                                                                                                                                                      | `''`               | -       |
| max-size         | `number`                                                         | Set the max size of uploaded files                                                                                                                                                                                                  | `null`             | -       |
| field            | `string`                                                         | The field that sets the file in the request form data                                                                                                                                                                               | `'file'`           | -       |
| data             | `Record<string, string \| Blob>`                                 | Set the data to upload with the file, in the form of `key-value`                                                                                                                                                                    | `{}`               | -       |
| headers          | `Record<string, string>`                                         | Set request headers for upload request                                                                                                                                                                                              | `{}`               | -       |
| with-credentials | `boolean`                                                        | Set whether upload request carries cookie information                                                                                                                                                                               | `false`            | -       |
| manual           | `boolean`                                                        | Set whether to not automatically initiate upload after file selection                                                                                                                                                               | `false`            | -       |
| hidden-files     | `boolean`                                                        | Set whether to hide the file list                                                                                                                                                                                                   | `false`            | -       |
| hidden-icon      | `boolean`                                                        | Set whether to hide the file icon                                                                                                                                                                                                   | `false`            | -       |
| count-limit      | `number`                                                         | Set the max number of files to upload when multiple files are selected. When it is `0`, there is no limit                                                                                                                           | `0`                | -       |
| allow-drag       | `boolean`                                                        | Set whether to allow uploading by dragging files                                                                                                                                                                                    | `false`            | -       |
| on-before-upload | `(file: SourceFile, files: SourceFile[]) => any \| Promise<any>` | Set the callback before file upload, receive the uploaded File object and the list of files to be uploaded, support asynchronous Function and Promise, return value of `false` will prevent upload                                  | `null`             | -       |
| on-before-select | `(file: SourceFile, files: SourceFile[]) => any \| Promise<any>` | Set the callback before file selection, receive the selected File object (if in incremental mode, also Receives a list of existing files), supports async functions and promises, returns a value of `false` will prevent selection | `null`             | -       |
| icon-renderer    | `(data: { file: SourceFile }) => any`                            | The rendering method of the file icon, the first parameter is h, the second parameter is the File object                                                                                                                            | `null`             | -       |
| directory        | `boolean`                                                        | Set whether to enable folder uploading. Note that when using click upload, only folders can be forced to be uploaded. At the same time, this feature requires browsers to support `webkitdirectory`                                 | `false`            | -       |
| path-field       | `string`                                                         | Set the field of the file path in the request form data, enable the relative location of the file after the folder is uploaded                                                                                                      | `'path'`           | -       |
| disabled-click   | `boolean`                                                        | Set whether to disable click to upload, if disabled, drag and drop upload will be enabled by default                                                                                                                                | `false`            | -       |
| button-label     | `string`                                                         | Set the text content of the built-in upload button                                                                                                                                                                                  | `locale.upload`    | `2.0.0` |
| disabled         | `boolean`                                                        | Set whether the upload is disabled                                                                                                                                                                                                  | `false`            | `2.0.0` |

The various states of the File are encapsulated inside the component:

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
```

### Upload Events

| Name         | Description                                                                                                               | Parameters                                         | Since |
| ------------ | ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ----- |
| change       | Emitter when the selected file changes, returns the list of selected files                                                | `(files: SourceFile[])`                            | -     |
| filter-error | Emitter when file type verification fails, returns the failed file                                                        | `(errorFile: SourceFile)`                          | -     |
| size-error   | Emitter when the file size check fails, returns the failed file                                                           | `(errorFile: SourceFile)`                          | -     |
| progress     | Emitted when the progress of the uploaded file is updated, returns the latest progress and file                           | `(percent: number, file: SourceFile)`              | -     |
| success      | Emitter when the file is uploaded successfully, returns the latest progress and file                                      | `(response: any, file: SourceFile)`                | -     |
| error        | Emitter when file upload fails, returns the latest progress and file                                                      | `(error: HttpError, file: SourceFile)`             | -     |
| delete       | Emitter when the selected (uploaded) file is deleted, returns the deleted file                                            | `(file: SourceFile)`                               | -     |
| exceed       | Emitter when the selected file exceeds the upper limit, returns the list of exceeded files and the list of selected files | `(exceedFiles: SourceFile[], files: SourceFile[])` | -     |
| preview      | Emitter when a file is previewed, returns the previewed file                                                              | `(file: SourceFile)`                               | -     |

### Upload Slots

| Name    | Description                                                                                                             | Parameters                | Since |
| ------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------- | ----- |
| default | Select the control slot of the file, `isDragOver` is used to mark whether there is content to be dragged on the control | `{ isDragOver: boolean }` | -     |
| tip     | Tip content slot, if the default slot is used, the slot will be invalid                                                 | -                         | -     |

### UploadList Props

| Name          | Type                                  | Description                                                                                                                                                                              | Default            | Since |
| ------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ----- |
| files         | `FileState[]`                         | Set the file data rendered by the file list. Its element is a proxy object inside the Upload component, which can be obtained through the `renderFiles` property of the Upload component | `[]`               | -     |
| select-to-add | `boolean`                             | Set whether to change the file list incrementally, which will produce different transition effects                                                                                       | `false`            | -     |
| icon-renderer | `(data: { file: SourceFile }) => any` | Same to Upload `icon-renderer` prop                                                                                                                                                      | `null`             | -     |
| loading-text  | `string`                              | Set the text prompt when the file is loaded                                                                                                                                              | `locale.uploading` | -     |

### UploadList Events

| Name    | Description                                                                    | Parameters           | Since |
| ------- | ------------------------------------------------------------------------------ | -------------------- | ----- |
| delete  | Emitter when the selected (uploaded) file is deleted, returns the deleted file | `(file: SourceFile)` | -     |
| preview | Emitter when a file is previewed, returns the previewed file                   | `(file: SourceFile)` | -     |

### UploadList Slots

| Name | Description                             | Parameters                                                           | Since |
| ---- | --------------------------------------- | -------------------------------------------------------------------- | ----- |
| item | Content slot for file info in file list | `{ file: SourceFile, status: UploadStatusType, percentage: number }` | -     |
| icon | Slot for file icon                      | `{ file: SourceFile }`                                               | -     |
