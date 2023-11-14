# Upload

The upload control is used to upload some files to the remote server through the web page, which can provide friendly interaction and complete information display.

## Demos

:::demo upload/basis

### Basis Usage

Use `url` prop to set the upload destination address, which will be automatically uploaded after selecting a file. By default is single file upload.

:::

:::demo upload/drag

### Drop Upload

Add the `allow-drag` prop to enable drag and drop upload mode.

:::

:::demo upload/default-files

### Default Files

The `default-files` prop allows you to set static default files that will not be processed on upload.

:::

:::demo upload/list-type

### List Type

The file list type can be set via the `list-type` prop.

:::

:::demo upload/manual

### Manual Upload

When the `url` prop is not set, the internal `execute` method will be blocked and the file needs to be uploaded manually.

It is also possible to explicitly set the `manual` prop to enable manual upload mode.

:::

:::demo upload/image

### Image Mode

Adding the `image` prop to enable image upload mode, after which the `accept` and `list-type` props will be invalid.

:::

:::demo upload/select-to-add

### Select To Add

By default the file list will reset when re-select.

If you want to append those selected files to the file list, you can add the `select-to-add` prop.

:::

:::demo upload/separation

### List Separation

Add the `hidden-files` prop to disable the internal file listing display.

And you can achieve the effect of a separate file list with the UploadList component. Of course you can write it by yourself.

:::

:::demo upload/multiple

### Multiple Upload

Adding the `multiple` prop to enable multiple files upload.

:::

:::demo upload/directory

### Directory Upload

Add the `directory` prop to enable folder upload mode.

When using the click-to-upload interaction, only folders can be uploaded due to browser limitations.

Note that this feature only works in browsers that support `webkitdirectory`.

:::

## API

### Preset Types

```ts
type UploadListType = 'name' | 'detail' | 'thumbnail' | 'card'
type UploadStatusType = 'pending' | 'uploading' | 'fail' | 'success' | 'delete'

type UploadSourceFile = File & { path?: string }

type UploadHttpError = Error & {
  response: any,
  url: string,
  status: number,
  method: string
}

interface UploadFileState {
  id: string,
  name: string,
  size: number,
  type: string,
  base64: string | null,
  status: UploadStatusType,
  percentage: number,
  source: UploadSourceFile,
  path: string,
  xhr: XMLHttpRequest | null,
  response: any,
  error: UploadHttpError | null
}

type UploadFileOptions = Partial<Omit<UploadFileState, 'xhr' | 'response' | 'error'>>
type BeforeUpload = (file: UploadFileState, files: UploadFileState[]) => MaybePromise<
  | boolean
  | Blob
  | SourceFile
  | void
>
type BeforeSelect = (file: UploadFileState, files: UploadFileState[]) => MaybePromise<boolean | void>
```

### Upload Props

| Name             | Type                                             | Description                                                                                                                                                                                         | Default            | Since   |
| ---------------- | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------- |
| state            | `'default' \| 'success' \| 'error' \| 'warning'` | the state of upload                                                                                                                                                                                 | `'default'`        | `2.0.0` |
| url              | `string`                                         | The file upload destination url                                                                                                                                                                     | `''`               | -       |
| file-list        | `UploadFileState[]`                              | Set the file list of upload, can use `v-model` for two-way binding                                                                                                                                  | `[]`               | `2.0.0` |
| multiple         | `boolean`                                        | Set whether to select multiple files                                                                                                                                                                | `false`            | -       |
| tip              | `string`                                         | Set the upload tip                                                                                                                                                                                  | `''`               | -       |
| loading-text     | `string`                                         | Set the text prompt when loading                                                                                                                                                                    | `locale.uploading` | -       |
| list-type        | `UploadListType`                                 | Set the type of file list                                                                                                                                                                           | `'name'`           | -       |
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
| icon-renderer    | `(data: { file: UploadFileState }) => any`       | The render method of the file icon                                                                                                                                                                  | `null`             | -       |
| directory        | `boolean`                                        | Set whether to enable folder uploading. Note that when using click upload, only folders can be forced to be uploaded. At the same time, this feature requires browsers to support `webkitdirectory` | `false`            | -       |
| path-field       | `string`                                         | Set the field of the file path in the request form data, enable the relative location of the file after the folder is uploaded                                                                      | `'path'`           | -       |
| disabled-click   | `boolean`                                        | Set whether to disable click to upload, if disabled, drag and drop upload will be enabled by default                                                                                                | `false`            | -       |
| button-label     | `string`                                         | Set the text content of the built-in upload button                                                                                                                                                  | `locale.upload`    | `2.0.0` |
| disabled         | `boolean`                                        | Set whether the upload is disabled                                                                                                                                                                  | `false`            | `2.0.0` |
| loading          | `boolean`                                        | Set whether is loading                                                                                                                                                                              | `false`            | `2.0.0` |
| loading-icon     | `Record<string, any>`                            | Set the loading icon                                                                                                                                                                                | `Spinner`          | `2.0.0` |
| loading-lock     | `boolean`                                        | Set whether to be read-only when loading                                                                                                                                                            | `false`            | `2.0.0` |
| loading-effect   | `string`                                         | Set the effect animation for the loading icon                                                                                                                                                       | `false`            | `2.0.0` |
| default-files    | `UploadFileOptions`                              | Set static file list                                                                                                                                                                                | `[]`               | `2.0.0` |
| can-preview      | `(file: UploadFileState) => boolean>`            | Determine whether the file can be previewed                                                                                                                                                         | `isImage`          | `2.0.0` |
| image            | `boolean`                                        | Whether to enable image upload mode, `list-type` prop will be invalid after enable                                                                                                                  | `false`            | `2.0.8` |
| locale           | `LocaleConfig['upload']`                         | Set the locale config                                                                                                                                                                               | `null`             | `2.1.0` |
| name             | `string`                                         | set `name` attribute of internal `<input>`                                                                                                                                                          | `''`               | `2.2.2` |

### Upload Events

| Name         | Description                                                                                                               | Parameters                                  | Since |
| ------------ | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ----- |
| change       | Emitted when the selected file changes, returns the list of selected files                                                | `(files: UploadFileState[])`                | -     |
| filter-error | Emitted when file type verification fails, returns the failed file                                                        | `(errorFile: UploadFileState)`              | -     |
| size-error   | Emitted when the file size check fails, returns the failed file                                                           | `(errorFile: UploadFileState)`              | -     |
| progress     | Emitted when the progress of the uploaded file is updated, returns the latest progress and file                           | `(file: UploadFileState, percent: number)`  | -     |
| success      | Emitted when the file is uploaded successfully, returns the latest progress and file                                      | `(file: UploadFileState, response: any)`    | -     |
| error        | Emitted when file upload fails, returns the latest progress and file                                                      | `(file: UploadFileState, error: HttpError)` | -     |
| delete       | Emitted when the selected (uploaded) file is deleted, returns the deleted file                                            | `(file: UploadFileState)`                   | -     |
| exceed       | Emitted when the selected file exceeds the upper limit, returns the list of exceeded files and the list of selected files | `(exceedFiles: UploadFileState[])`          | -     |
| preview      | Emitted when a file is previewed, returns the previewed file                                                              | `(file: UploadFileState)`                   | -     |

### Upload Slots

| Name    | Description                                                                                                             | Parameters                                                                | Since |
| ------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ----- |
| default | Select the control slot of the file, `isDragOver` is used to mark whether there is content to be dragged on the control | `{ isDragOver: boolean }`                                                 | -     |
| tip     | Tip content slot, if the default slot is used, the slot will be invalid                                                 | -                                                                         | -     |
| item    | Content slot for file info in file list                                                                                 | `{ file: UploadFileState, status: UploadStatusType, percentage: number }` | -     |
| icon    | Slot for file icon                                                                                                      | `{ file: UploadFileState }`                                               | -     |

### UploadList Props

| Name          | Type                                       | Description                                                                                                                                                                              | Default            | Since   |
| ------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------- |
| files         | `UploadFileState[]`                        | Set the file data rendered by the file list. Its element is a proxy object inside the Upload component, which can be obtained through the `renderFiles` property of the Upload component | `[]`               | -       |
| select-to-add | `boolean`                                  | Set whether to change the file list incrementally, which will produce different transition effects                                                                                       | `false`            | -       |
| icon-renderer | `(data: { file: UploadFileState }) => any` | Same to Upload `icon-renderer` prop                                                                                                                                                      | `null`             | -       |
| list-type     | `UploadListType`                           | Set the type of file list                                                                                                                                                                | `'name'`           | -       |
| loading-text  | `string`                                   | Set the text prompt when the file is loaded                                                                                                                                              | `locale.uploading` | -       |
| can-preview   | `(file: UploadFileState) => boolean>`      | Determine whether the file can be previewed                                                                                                                                              | `isImage`          | `2.0.0` |
| precision     | `number`                                   | The precision of upload progress percent                                                                                                                                                 | `2`                | `2.0.0` |

### UploadList Events

| Name    | Description                                                                    | Parameters                | Since |
| ------- | ------------------------------------------------------------------------------ | ------------------------- | ----- |
| delete  | Emitted when the selected (uploaded) file is deleted, returns the deleted file | `(file: UploadFileState)` | -     |
| preview | Emitted when a file is previewed, returns the previewed file                   | `(file: UploadFileState)` | -     |

### UploadList Slots

| Name   | Description                             | Parameters                                                                | Since   |
| ------ | --------------------------------------- | ------------------------------------------------------------------------- | ------- |
| item   | Content slot for file info in file list | `{ file: UploadFileState, status: UploadStatusType, percentage: number }` | -       |
| icon   | Slot for file icon                      | `{ file: UploadFileState }`                                               | -       |
| suffix | Slot for content after file list        | -                                                                         | `2.0.8` |
