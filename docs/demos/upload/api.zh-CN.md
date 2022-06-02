### Upload 属性

| 名称             | 类型            | 说明                                                                                                                               | 默认值   | 始于 |
| ---------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------- | --- |
| url              | `string`          | 文件的上传的目标地址                                                                                                               | `''`       | - |
| multiple         | `boolean`         | 设置是否可以多选文件                                                                                                               | `false`    | - |
| tip              | `string`          | 设置上传的提示语                                                                                                                   | `''`       | - |
| loading-text     | `string`          | 设置加载时的文字提示                                                                                                               | `locale.uploading` | - |
| list-type        | `string`          | 设置文件列表的类型，可选值为 `name`、`thumbnail`、`card`                                                                           | `'name'`   | - |
| select-to-add    | `boolean`        | 设置选择文件时是否为增量模式                                                                                                       | `false`    | - |
| block            | `boolean`         | 是否为块级元素，设置后宽度变为 `100%`                                                                                                | `false`    | - |
| accept           | `string \| string[]` | 原生 `<input>` 的 `accept` 属性，传入数组时会自动用 `,` 连接                                                                             | `null`     | - |
| filter           | `string \| string[]` | 设置文件的类型过滤，采用文件的拓展名过滤                                                                                           | `''`       | - |
| max-size         | `number`          | 设置上传文件的最大大小                                                                                                             | `null`     | - |
| field            | `string`          | 设置文件在请求表单数据中的字段                                                                                                     | `'file'`   | - |
| data             | `Record<string, string \| Blob>`          | 设置同文件一同上传的数据，`key-value` 的形式                                                                                         | `{}`       | - |
| headers          | `Record<string, string>`          | 设置上传请求的请求头                                                                                                               | `{}`       | - |
| with-credentials | `boolean`         | 设置上传请求是否携带 cookie 信息                                                                                                   | `false`    | - |
| manual           | `boolean`         | 设置是否在选择文件后不自动发起上传                                                                                                 | `false`    | - |
| hidden-files     | `boolean`         | 设置是否隐藏文件列表                                                                                                               | `false`    | - |
| hidden-icon      | `boolean`         | 设置是否隐藏文件图标                                                                                                               | `false`    | - |
| count-limit      | `number`          | 在多选文件时设置文件的上传最大数量，为 `0` 时不做限制                                                                                | `0`        | - |
| allow-drag       | `boolean`         | 设置是否允许使用拖拽文件进行上传                                                                                                   | `false`    | - |
| on-before-upload    | `(file: SourceFile, files: SourceFile[]) => any \| Promise<any>`        | 设置文件上传前的回调，接收上传 File 对象和待上传的文件列表，支持异步函数和 Promise，返回值为 `false` 会阻止上传                      | `null`     | - |
| on-before-select    | `(file: SourceFile, files: SourceFile[]) => any \| Promise<any>`        | 设置文件选择前的回调，接收选择的 File 对象 (如果为增量模式还会接收已有文件列表)，支持异步函数和 Promise，返回值为 `false` 会阻止选择 | `null`     | - |
| icon-renderer    | `(data: { file: SourceFile }) => any`        | 文件图标的渲染方法，第一个参数为 h，第二个参数为 File 对象                                                                         | `null`     | - |
| directory        | `boolean`         | 设置是否开启文件夹上传，注意，当使用点击上传时将会强制只能上传文件夹，同时该特性需要浏览器支持 `webkitdirectory`                   | `false`    | - |
| path-field       | `string`          | 设置文件路径在请求表单数据中的字段，开启了文件夹上传后用于记录文件的相对位置                                                       | `'path'`   | - |
| disabled-click   | `boolean`         | 设置是否禁用点击上传，禁用后将默认打开拖拽上传                                                                                     | `false`    | - |

组件内部对 File 的各项状态进行了封装：

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

### Upload 事件

| 名称            | 说明                                                           | 参数               | 始于 |
| --------------- | -------------------------------------------------------------- | ------------------ | --- |
| change       | 选择的文件发生改变时触发，返回已选的文件列表                   | `(files: SourceFile[])`              | - |
| filter-error | 当文件类型校验失败时触发，返回失败的文件                       | `(errorFile: SourceFile)`          | - |
| size-error   | 当文件大小校验失败时触发，返回失败的文件                       | `(errorFile: SourceFile)`          | - |
| progress     | 当上传文件的进度更新时触发，返回最新进度和文件                 | `(percent: number, file: SourceFile)`      | - |
| success      | 当文件上传成功时触发，返回最新进度和文件                       | `(response: any, file: SourceFile)`     | - |
| error        | 当文件上传失败时触发，返回最新进度和文件                       | `(error: HttpError, file: SourceFile)`        | - |
| delete       | 当删除了选择 (上传) 的文件时触发，返回被删除的文件             | `(file: SourceFile)`               | - |
| exceed       | 当选择的文件超过上限时触发，返回超出的文件列表和已选的文件列表 | `(exceedFiles: SourceFile[], files: SourceFile[])` | - |
| preview      | 当对文件进行预览时触发，返回预览的文件                         | `(file: SourceFile)`               | - |

### Upload 插槽

| 名称    | 说明                                                                                     | 参数 | 始于 |
| ------- | ---------------------------------------------------------------------------------------- | --- | --- |
| default | 选择文件的控件插槽，`isDragOver` 用于标记是否有内容往控件上拖拽 | `(isDragOver: boolean)` | - |
| tip     | 提示语内容插槽，如果使用了默认插槽，该插槽会失效                                         | - | - |

### UploadList 属性

| 名称          | 类型     | 说明                                                                                                              | 默认值   | 始于 |
| ------------- | -------- | ----------------------------------------------------------------------------------------------------------------- | -------- | --- |
| files         | `FileState[]`    | 设置文件列表渲染的文件数据，其元素是 Upload 组件内部的一个代理对象，可以通过 Upload 组件的 `renderFiles` 属性获取 | `[]`       | - |
| select-to-add | `boolean`  | 设置文件列表变化时是否为增量变化，这将会产生不一样的过渡效果                                                      | `false`    | - |
| icon-renderer | `(data: { file: SourceFile }) => any` | 同 Upload 的同名属性                                                                                              | `null`     | - |
| loading-text  | `string`   | 设置文件加载时的文字提示                                                                                          | `locale.uploading` | - |

### UploadList 事件

| 名称       | 说明                                               | 参数 | 始于 |
| ---------- | -------------------------------------------------- | ---- | --- |
| delete  | 当删除了选择 (上传) 的文件时触发，返回被删除的文件 | `(file: SourceFile)` | - |
| preview | 当对文件进行预览时触发，返回预览的文件             | `(file: SourceFile)` | - |

### UploadList 插槽

| 名称 | 说明                         | 参数 | 始于 |
| ---- | ---------------------------- | --- | --- |
| item | 文件列表中文件信息的内容插槽 | `(file: SourceFile, status: UploadStatusType, percentage: number)` | - |
| icon | 文件图标的插槽               | `(file: SourceFile)` | - |
