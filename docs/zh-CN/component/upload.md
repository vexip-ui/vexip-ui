# Upload 上传

文件上传控件，用于将一些文件通过网页上传至远端服务器的场景，能够提供友好的交互和完善的信息展示。

## 代码示例

:::demo upload/basis

### 基础用法

通过 `url` 属性设置上传的目标地址，在选择文件后将自动上传，默认单文件上传。

:::

:::demo upload/drag

### 拖拽上传

添加 `allow-drag` 属性可以开启拖拽上传模式。

:::

:::demo upload/default-files

### 默认文件

通过 `default-files` 属性可以设置静态的默认文件，这些文件在上传时不会进行处理。

:::

:::demo upload/list-type

### 列表类型

通过 `list-type` 属性可以设置文件列表类型。

:::

:::demo upload/manual

### 手动上传

在未设置 `url` 属性时，内部的 `execute` 方法将会被阻断，需要手动上传文件。

也可以显示地设置 `manual` 属性以开启手动上传模式。

:::

:::demo upload/image

### 图片模式

添加 `image` 属性可以开启图片上传模式，开启该模式之后 `accept` 和 `list-type` 属性将会失效。

:::

:::demo upload/select-to-add

### 追加文件

默认情况下每次重新选择文件时都会覆盖上一次的文件。

如果希望选择文件后将其追加到原有的文件列表，可以添加 `select-to-add` 属性。

:::

:::demo upload/separation

### 列表分离

添加 `hidden-files` 属性可以禁用内部的文件列表显示。

同时配合 UploadList 组件可以达到单独文件列表的效果，当然你可以自己写。

:::

:::demo upload/multiple

### 多文件上传

添加 `multiple` 属性可以开启多文件上传。

:::

:::demo upload/directory

### 文件夹上传

添加 `directory` 属性可以开启文件夹上传模式。

当使用点击上传的交互时，由于浏览器的限制，只能仅上传文件夹。

注意，该特性只有在支持 `webkitdirectory` 的浏览器才能正常使用。

:::

## API

### 预设类型

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

### Upload 属性

| 名称             | 类型                                             | 说明                                                                                                             | 默认值             | 始于    |
| ---------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- | ------------------ | ------- |
| state            | `'default' \| 'success' \| 'error' \| 'warning'` | 设置上传的状态                                                                                                   | `'default'`        | `2.0.0` |
| url              | `string`                                         | 文件的上传的目标地址                                                                                             | `''`               | -       |
| file-list        | `UploadFileOptions[]`                            | 设置上传的文件列表，可以使用 `v-model` 双向绑定                                                                  | `[]`               | `2.0.0` |
| multiple         | `boolean`                                        | 设置是否可以多选文件                                                                                             | `false`            | -       |
| tip              | `string`                                         | 设置上传的提示语                                                                                                 | `''`               | -       |
| loading-text     | `string`                                         | 设置加载时的文字提示                                                                                             | `locale.uploading` | -       |
| list-type        | `UploadListType`                                 | 设置文件列表的类型                                                                                               | `'name'`           | -       |
| select-to-add    | `boolean`                                        | 设置选择文件时是否为增量模式                                                                                     | `false`            | -       |
| block            | `boolean`                                        | 是否为块级元素，设置后宽度变为 `100%`                                                                            | `false`            | -       |
| accept           | `string \| string[]`                             | 原生 `<input>` 的 `accept` 属性，传入数组时会自动用 `,` 连接                                                     | `null`             | -       |
| filter           | `string \| string[]`                             | 设置文件的类型过滤，采用文件的拓展名过滤                                                                         | `''`               | -       |
| max-size         | `number`                                         | 设置上传文件的最大大小                                                                                           | `null`             | -       |
| field            | `string`                                         | 设置文件在请求表单数据中的字段                                                                                   | `'file'`           | -       |
| data             | `Record<string, string \| Blob>`                 | 设置同文件一同上传的数据，`key-value` 的形式                                                                     | `{}`               | -       |
| headers          | `Record<string, string>`                         | 设置上传请求的请求头                                                                                             | `{}`               | -       |
| with-credentials | `boolean`                                        | 设置上传请求是否携带 cookie 信息                                                                                 | `false`            | -       |
| manual           | `boolean`                                        | 设置是否在选择文件后不自动发起上传                                                                               | `false`            | -       |
| hidden-files     | `boolean`                                        | 设置是否隐藏文件列表                                                                                             | `false`            | -       |
| hidden-icon      | `boolean`                                        | 设置是否隐藏文件图标                                                                                             | `false`            | -       |
| count-limit      | `number`                                         | 在多选文件时设置文件的上传最大数量，为 `0` 时不做限制                                                            | `0`                | -       |
| allow-drag       | `boolean`                                        | 设置是否允许使用拖拽文件进行上传                                                                                 | `false`            | -       |
| on-before-upload | `BeforeUpload`                                   | 设置文件上传前的回调，支持异步函数和 Promise，返回值为 `false` 会阻止上传，返回 `Blob` 或 `File` 回覆盖源文件    | `null`             | -       |
| on-before-select | `BeforeSelect`                                   | 设置文件选择前的回调，支持异步函数和 Promise，返回值为 `false` 会阻止选择                                        | `null`             | -       |
| icon-renderer    | `(data: { file: UploadFileState }) => any`       | 文件图标的渲染方法                                                                                               | `null`             | -       |
| directory        | `boolean`                                        | 设置是否开启文件夹上传，注意，当使用点击上传时将会强制只能上传文件夹，同时该特性需要浏览器支持 `webkitdirectory` | `false`            | -       |
| path-field       | `string`                                         | 设置文件路径在请求表单数据中的字段，开启了文件夹上传后用于记录文件的相对位置                                     | `'path'`           | -       |
| disabled-click   | `boolean`                                        | 设置是否禁用点击上传，禁用后将默认打开拖拽上传                                                                   | `false`            | -       |
| button-label     | `string`                                         | 设置内置上传按钮的文本内容                                                                                       | `locale.upload`    | `2.0.0` |
| disabled         | `boolean`                                        | 设置是否禁用上传                                                                                                 | `false`            | `2.0.0` |
| loading          | `boolean`                                        | 设置是否为加载中                                                                                                 | `false`            | `2.0.0` |
| loading-icon     | `Record<string, any>`                            | 设置加载中的图标                                                                                                 | `Spinner`          | `2.0.0` |
| loading-lock     | `boolean`                                        | 设置在加载中时是否为只读                                                                                         | `false`            | `2.0.0` |
| loading-effect   | `string`                                         | 设置加载中图标的效果动画                                                                                         | `false`            | `2.0.0` |
| default-files    | `UploadFileOptions`                              | 设置静态的文件列表                                                                                               | `[]`               | `2.0.0` |
| can-preview      | `(file: UploadFileState) => boolean>`            | 判断文件是否可以预览                                                                                             | `isImage`          | `2.0.0` |
| image            | `boolean`                                        | 是否开启图片上传模式，开启后 `list-type` 属性将会失效                                                            | `false`            | `2.0.8` |
| locale           | `LocaleConfig['upload']`                         | 设置多语言配置                                                                                                   | `null`             | `2.1.0` |
| name             | `string`                                         | 设置内部 `<input>` 的 `name` 属性                                                                                | `''`               | `2.2.2` |

### Upload 事件

| 名称         | 说明                                                           | 参数                                        | 始于 |
| ------------ | -------------------------------------------------------------- | ------------------------------------------- | ---- |
| change       | 选择的文件发生改变时触发，返回已选的文件列表                   | `(files: UploadFileState[])`                | -    |
| filter-error | 当文件类型校验失败时触发，返回失败的文件                       | `(errorFile: UploadFileState)`              | -    |
| size-error   | 当文件大小校验失败时触发，返回失败的文件                       | `(errorFile: UploadFileState)`              | -    |
| progress     | 当上传文件的进度更新时触发，返回最新进度和文件                 | `(file: UploadFileState, percent: number)`  | -    |
| success      | 当文件上传成功时触发，返回最新进度和文件                       | `(file: UploadFileState, response: any)`    | -    |
| error        | 当文件上传失败时触发，返回最新进度和文件                       | `(file: UploadFileState, error: HttpError)` | -    |
| delete       | 当删除了选择 (上传) 的文件时触发，返回被删除的文件             | `(file: UploadFileState)`                   | -    |
| exceed       | 当选择的文件超过上限时触发，返回超出的文件列表和已选的文件列表 | `(exceedFiles: UploadFileState[])`          | -    |
| preview      | 当对文件进行预览时触发，返回预览的文件                         | `(file: UploadFileState)`                   | -    |

### Upload 插槽

| 名称    | 说明                                                            | 参数                                                                      | 始于 |
| ------- | --------------------------------------------------------------- | ------------------------------------------------------------------------- | ---- |
| default | 选择文件的控件插槽，`isDragOver` 用于标记是否有内容往控件上拖拽 | `({ isDragOver: boolean })`                                               | -    |
| tip     | 提示语内容插槽，如果使用了默认插槽，该插槽会失效                | -                                                                         | -    |
| item    | 文件列表中文件信息的内容插槽                                    | `{ file: UploadFileState, status: UploadStatusType, percentage: number }` | -    |
| icon    | 文件图标的插槽                                                  | `{ file: UploadFileState }`                                               | -    |

### UploadList 属性

| 名称          | 类型                                       | 说明                                                                                              | 默认值             | 始于    |
| ------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------- | ------------------ | ------- |
| files         | `UploadFileState[]`                        | 设置文件列表渲染的文件数据，与 Upload 组件一同使用时可以通过 Upload 组件的 `renderFiles` 属性获取 | `[]`               | -       |
| select-to-add | `boolean`                                  | 设置文件列表变化时是否为增量变化，这将会产生不一样的过渡效果                                      | `false`            | -       |
| icon-renderer | `(data: { file: UploadFileState }) => any` | 同 Upload 的同名属性                                                                              | `null`             | -       |
| type          | `UploadListType`                           | 设置文件列表的类型                                                                                | `'name'`           | -       |
| loading-text  | `string`                                   | 设置文件加载时的文字提示                                                                          | `locale.uploading` | -       |
| can-preview   | `(file: UploadFileState) => boolean>`      | 判断文件是否可以预览                                                                              | `isImage`          | `2.0.0` |
| precision     | `number`                                   | 上传进度的百分比精度                                                                              | `2`                | `2.0.0` |

### UploadList 事件

| 名称    | 说明                                               | 参数                      | 始于 |
| ------- | -------------------------------------------------- | ------------------------- | ---- |
| delete  | 当删除了选择 (上传) 的文件时触发，返回被删除的文件 | `(file: UploadFileState)` | -    |
| preview | 当对文件进行预览时触发，返回预览的文件             | `(file: UploadFileState)` | -    |

### UploadList 插槽

| 名称   | 说明                     | 参数                                                                      | 始于    |
| ------ | ------------------------ | ------------------------------------------------------------------------- | ------- |
| item   | 文件列表中文件信息的插槽 | `{ file: UploadFileState, status: UploadStatusType, percentage: number }` | -       |
| icon   | 文件图标的插槽           | `{ file: UploadFileState }`                                               | -       |
| suffix | 文件列表后置内容的插槽   | -                                                                         | `2.0.8` |
