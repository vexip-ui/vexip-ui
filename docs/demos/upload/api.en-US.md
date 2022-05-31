### Upload 属性

| 名称             | 类型            | 说明                                                                                                                               | 默认值   |
| ---------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------- |
| url              | String          | 文件的上传的目标地址                                                                                                               | ''       |
| multiple         | Boolean         | 设置是否可以多选文件                                                                                                               | false    |
| tip              | String          | 设置上传的提示语                                                                                                                   | ''       |
| loading-text     | String          | 设置加载时的文字提示                                                                                                               | '上传中' |
| list-type        | String          | 设置文件列表的类型，可选值为 `name`、`thumbnail`、`card`                                                                           | 'name'   |
| select-to-add    | Function        | 设置选择文件时是否为增量模式                                                                                                       | false    |
| block            | Boolean         | 是否为块级元素，设置后宽度变为 100%                                                                                                | false    |
| accept           | String \| Array | 原生 input 的 accept 属性，传入数组时会自动用 `,` 连接                                                                             | null     |
| filter           | String \| Array | 设置文件的类型过滤，采用文件的拓展名过滤                                                                                           | ''       |
| max-size         | Number          | 设置上传文件的最大大小                                                                                                             | null     |
| field            | String          | 设置文件在请求表单数据中的字段                                                                                                     | 'file'   |
| data             | Object          | 设置同文件一同上传的数据，key-value 的形式                                                                                         | {}       |
| headers          | Object          | 设置上传请求的请求头                                                                                                               | {}       |
| with-credentials | Boolean         | 设置上传请求是否携带 cookie 信息                                                                                                   | false    |
| manual           | Boolean         | 设置是否在选择文件后不自动发起上传                                                                                                 | false    |
| hidden-files     | Boolean         | 设置是否隐藏文件列表                                                                                                               | false    |
| hidden-icon      | Boolean         | 设置是否隐藏文件图标                                                                                                               | false    |
| count-limit      | Number          | 在多选文件时设置文件的上传最大数量，为 9 时不做限制                                                                                | 0        |
| allow-drag       | Boolean         | 设置是否允许使用拖拽文件进行上传                                                                                                   | false    |
| before-upload    | Function        | 设置文件上传前的回调，接收上传 File 对象和待上传的文件列表，支持异步函数和 Promise，返回值为 false 会阻止上传                      | null     |
| before-select    | Function        | 设置文件选择前的回调，接收选择的 File 对象 (如果为增量模式还会接收已有文件列表)，支持异步函数和 Promise，返回值为 false 会阻止选择 | null     |
| icon-renderer    | Function        | 文件图标的渲染方法，第一个参数为 h，第二个参数为 File 对象                                                                         | null     |
| directory        | Boolean         | 设置是否开启文件夹上传，注意，当使用点击上传时将会强制只能上传文件夹，同时该特性需要浏览器支持 `webkitdirectory`                   | false    |
| path-field       | String          | 设置文件路径在请求表单数据中的字段，开启了文件夹上传后用于记录文件的相对位置                                                       | 'path'   |
| disabled-click   | Boolean         | 设置是否禁用点击上传，禁用后将默认打开拖拽上传                                                                                     | false    |

### Upload 事件

| 名称            | 说明                                                           | 参数               |
| --------------- | -------------------------------------------------------------- | ------------------ |
| change       | 选择的文件发生改变时触发，返回已选的文件列表                   | files              |
| filter-error | 当文件类型校验失败时触发，返回失败的文件                       | errorFile          |
| size-error   | 当文件大小校验失败时触发，返回失败的文件                       | errorFile          |
| progress     | 当上传文件的进度更新时触发，返回最新进度和文件                 | percent, file      |
| success      | 当文件上传成功时触发，返回最新进度和文件                       | response, file     |
| error        | 当文件上传失败时触发，返回最新进度和文件                       | error, file        |
| delete       | 当删除了选择 (上传) 的文件时触发，返回被删除的文件             | file               |
| exceed       | 当选择的文件超过上限时触发，返回超出的文件列表和已选的文件列表 | exceedFiles, files |
| preview      | 当对文件进行预览时触发，返回预览的文件                         | file               |

### Upload 插槽

| 名称    | 说明                                                                                     |
| ------- | ---------------------------------------------------------------------------------------- |
| default | 选择文件的控件插槽，接收一个 `{ isDragOver }` 对象，该属性用于标记是否有内容往控件上拖拽 |
| tip     | 提示语内容插槽，如果使用了控件插槽，该插槽会失效                                         |
| item    | 文件列表中文件信息的内容插槽                                                             |
| icon    | 文件图标的插槽                                                                           |

### UploadList 属性

| 名称          | 类型     | 说明                                                                                                              | 默认值   |
| ------------- | -------- | ----------------------------------------------------------------------------------------------------------------- | -------- |
| files         | Array    | 设置文件列表渲染的文件数据，其元素是 Upload 组件内部的一个代理对象，可以通过 Upload 组件的 `renderFiles` 属性获取 | []       |
| select-to-add | Boolean  | 设置文件列表变化时是否为增量变化，这将会产生不一样的过渡效果                                                      | false    |
| icon-renderer | Function | 同 Upload 的同名属性                                                                                              | null     |
| loading-text  | String   | 设置文件加载时的文字提示                                                                                          | '上传中' |

### UploadList 事件

| 名称       | 说明                                               | 参数 |
| ---------- | -------------------------------------------------- | ---- |
| delete  | 当删除了选择 (上传) 的文件时触发，返回被删除的文件 | file |
| preview | 当对文件进行预览时触发，返回预览的文件             | file |

### UploadList 插槽

| 名称 | 说明                         |
| ---- | ---------------------------- |
| item | 文件列表中文件信息的内容插槽 |
| icon | 文件图标的插槽               |
