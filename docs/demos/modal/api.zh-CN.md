### Modal 属性

| 名称            | 类型                                | 说明                                                                                                                  | 默认值           | 始于 |
| --------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ---------------- | --- |
| active          | `boolean`                           | 设置模态框是否显示，可以使用 v-model 双向绑定                                                                         | `false`          | - |
| width           | `number`                            | 设置模态框的初始宽度                                                                                                  | `'auto'`         | - |
| height          | `number \| string`                  | 设置模态框的初始高度，为 `'auto'` 时自动计算，否则需传入数字类型                                                      | `'auto'`         | - |
| top             | `number \| string`                  | 设置模态框距离顶部的初始距离，为 auto 时自动居中，否则需传入数字类型                                                  | `100`            | - |
| left            | `number \| string`                  | 设置模态框距离左侧的初始距离，为 auto 时自动居中，否则需传入数字类型                                                  | `'auto'`         | - |
| bottom          | `number \| string`                  | 设置模态框距离底部的初始距离，为 auto 时自动计算，否则需传入数字类型                                                  | `'auto'`         | - |
| title           | `string`                            | 设置模态框的标题                                                                                                      | `''`             | - |
| closable        | `boolean`                           | 设置是否具有关闭按钮                                                                                                  | `true`           | - |
| mask-close      | `boolean`                           | 设置是否可以点击遮罩层关闭                                                                                            | `true`           | - |
| inner           | `boolean`                           | 设置是否为一个内联的抽屉，开启后定位从 fixed 变位 absolute                                                            | `false`          | - |
| modal-class     | `string \| Record<string, boolean>` | 模态框的自定义类名                                                                                                    | `null`           | - |
| no-footer       | `boolean`                           | 是否禁用底部的操作按钮                                                                                                | `false`          | - |
| hide-mask       | `boolean`                           | 设置是否隐藏遮罩层                                                                                                    | `false`          | - |
| transfer        | `boolean \| string`                 | 设置模态框的渲染位置，设置为 `true` 时默认渲染至 `<body>`                                                             | `false`          | - |
| on-before-close | `(isConfirm: boolean) => any`       | 设置模态框的关闭前回调，接收一个标识区分是确认或是取消触发的关闭，支持异步函数和 Promise，返回值为 `false` 会阻止关闭 | `null`           | - |
| draggable       | `boolean`                           | 设置模态框是否可以拖拽                                                                                                | `false`          | - |
| resizable       | `boolean`                           | 设置模态框是否可以改变大小                                                                                            | `false`          | - |
| loading         | `boolean`                           | 设置模态框的确认按钮是否为加载状态                                                                                    | `false`          | - |
| min-width       | `number`                            | 设置模态框的的最小宽度，主要用于设置了 `resizable`                                                                    | `150`            | - |
| min-height      | `number`                            | 设置模态框的的最小高度，主要用于设置了 `resizable`                                                                    | `120`            | - |
| confirm-text    | `string`                            | 确认按钮的内容                                                                                                        | `locale.confirm` | - |
| cancel-text     | `string`                            | 取消按钮的内容                                                                                                        | `locale.cancel`  | - |

### Modal 事件

| 名称         | 说明                                                   | 参数                                        | 始于 |
| ------------ | ------------------------------------------------------ | ------------------------------------------- | --- |
| toggle       | 当模态框的激活状态改变时触发，返回当前的激活状态       | `(active: boolean)`                         | - |
| confirm           | 当点击了底部的确定按钮时触发，无返回值                 | -                                           | - |
| cancel       | 当点击了底部的取消按钮时触发，无返回值                 | -                                           | - |
| close        | 当用关闭功能触发关闭时触发，无返回值                   | -                                           | - |
| show         | 当抽屉打开后，过渡效果结束后触发，无返回值             | -                                           | - |
| hide         | 当模态框关闭后，过渡效果结束，完全消失时触发，无返回值 | -                                           | - |
| drag-start   | 当将要开始拖拽时触发，无返回值                         | -                                           | - |
| drag-move    | 当正在拖拽时触发，返回一个包含位置信息的对象           | `(position: { top: number, left: number })` | - |
| drag-end     | 当结束拖拽时触发，无返回值                             | `(position: { top: number, left: number })` | - |
| resize-start | 当抽屉将要开始调整大小时触发，无返回值                 | -                                           | - |
| resize-move  | 当抽屉正在调整大小时触发，返回一个包含抽屉宽高的对象   | `(rect: { width: number, height: number })` | - |
| resize-end   | 当抽屉结束调整大小时触发，无返回值                     | `(rect: { width: number, height: number })` | - |

### Modal 插槽

| 名称    | 说明             | 参数 | 始于 |
| ------- | ---------------- | ---- | --- |
| default | 模态框的内容插槽 | -    | - |
| close   | 关闭按钮的插槽   | -    | - |
| header  | 模态框的头部插槽 | -    | - |
| footer  | 模态框的底部插槽 | -    | - |
